package com.app.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeEditResponse;

import com.app.dto.ResumeResponseDTO;
import com.app.entities.Employee;
import com.app.entities.Job;
import com.app.entities.Recruiter;
import com.app.entities.UserEntity;
import com.app.repository.EmployeeRepository;
import com.app.repository.JobRepository;
import com.app.repository.RecruiterRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService {
	@Autowired
	UserRepository userRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	EmployeeRepository empRepo;
	@Autowired
	EntityManager em;
	@Autowired
	JobRepository jobRepo;
	@Autowired
	private EmailSenderService eService;

	@Override
	public ApiResponse editEmployee(long Employeeid, EmployeeEditRequest req) {
		// TODO Auto-generated method stub
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		UserEntity user = userRepo.findById(Employeeid)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
		Employee transientEmp = mapper.map(req, Employee.class);
		transientEmp.setEmployeeUser(user);
		empRepo.save(transientEmp);
		return new ApiResponse(user.getFirstName() + " you have succesfully edited the details");

	}

	@Override
	public ResumeResponseDTO generateResume(long empId) {
		// String jpql="Select
		// u.firstName,u.lastName,u.email,e.sscMarks,e.hscMarks,e.degreeMarks,e.graduation,e.branch,e.experience,e.contact,e.skills
		// from UserEntity u join fetch u.emp e where u.id=:eid";

		String jpql = "Select u from UserEntity u where u.id=:uid";

		UserEntity user = em.createQuery(jpql, UserEntity.class).setParameter("uid", empId).getSingleResult();

		String jpql1 = "Select e from Employee e where e.id=:uid";

		Employee emp = em.createQuery(jpql1, Employee.class).setParameter("uid", empId).getSingleResult();

		ResumeResponseDTO rdto = new ResumeResponseDTO(user.getFirstName(), user.getLastName(), user.getEmail(),
				emp.getSscMarks(), emp.getHscMarks(), emp.getDegreeMarks(), emp.getGraduation(), emp.getBranch(),
				emp.getExperience(), emp.getContact(), emp.getSkills());

//		
//		 ResumeResponseDTO rdto=em.createQuery(jpql,
//		 ResumeResponseDTO.class).setParameter("eid", empId).getSingleResult();
//
//		

		/*
		 * private String firstName; private String lastName; private String email;
		 * 
		 * private double sscMarks;
		 * 
		 * private double hscMarks;
		 * 
		 * private double degreeMarks;
		 * 
		 * private String graduation;
		 * 
		 * private String branch;
		 * 
		 * private double experience;
		 * 
		 * private long contact;
		 * 
		 * private List<String> skills = new ArrayList<>();
		 */

		return rdto;
	}

	@Override
	public List<Recruiter> searchJobByProfile(String jobProfile) {

//		List<Job>jobs = jobRepo.findAll().stream().map(s -> {if(s.getJobProfile().equals(jobProfile)) return s;
//		return null;}).collect(Collectors.toList()); 
		System.out.println("in searchByJobProfile()");
		// List<Job>jobs = jobRepo.findAll().stream().filter(s ->
		// s.getJobProfile().equals(jobProfile)).collect(Collectors.toList());

		// String jpql = "Select new
		// com.app.entities.Job(jobProfile,jobVacancy,experience) j from Job j where
		// j.jobProfile=:jP";
		// String jpql = "select
		// r.companyName,r.companyAddress,r.companyContact,j.jobProfile,j.jobVacancy,j.experience
		// from Recruiter r join fetch r.jobs j where j.jobProfile= :jP" ;

		String jpql = "select r from Recruiter r join fetch r.jobs j where j.jobProfile= :jP";
		// String jpql = "select r from Recruiter r join r.jobs j where j.jobProfile=
		// :jP" ;
		// String jpql = "select j from Job j where j.jobProfile= :jP" ;

		List<Recruiter> recruiters = em.createQuery(jpql, Recruiter.class).setParameter("jP", jobProfile)
				.getResultList();
		// List<JobSearchResponse>recruiters =
		// em.createQuery(jpql,JobSearchResponse.class).setParameter("jP",
		// jobProfile).getResultList() ;

		System.out.println("**************0" + recruiters);
		return recruiters;
	}

	@Override
	public Object applyJob(long jobId, long empId) {

		if (jobRepo.existsById(jobId)) {
			Employee em = empRepo.findById(empId)
					.orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
			;

			String emailDetails = em.getEmployeeUser().getEmail();
			String CandidateName = em.getEmployeeUser().getFirstName() + "  " + em.getEmployeeUser().getLastName();

			em.getJobs()
					.add(jobRepo.findById(jobId).orElseThrow(() -> new ResourceNotFoundException("Invalid Job Id")));

			eService.sendSimpleEmail(/* emailDetails */"sourabhpatil8282@gmail.com",
					"Dear" + " " + CandidateName + "," + "\r\n" + "\r\n" + "\r\n" + "\r\n"

							+ "Thank you for choosing Online Job Portal platform for appyling for jobs.\r\n"
							+ "The recruiter will be sure to reach out to you.\r\n"
							+ "Appreciate your interest and wishing you all the best.\r\n"
							+ "Thanks for applying for job !!!!\r\n You have successfully applied for job with JOBID :"
							+ jobId + "\r\nWe will get back to you soon....." + "\r\n" + "\r\n" + "\r\n" + "\r\n"
							+ "Best Regards,\r\n" + "Online Job Portal Project 32Team from Acts Pune",
					"Regarding your job appliction");

		}

		// email,body,subject

		return "You have successfully applied for job with JOBID:" + jobId;
	}

	@Override
	public String changeEmployeeDetails(long userId, ChangeEmpRequestDTO req) {
		System.out.println("In service layer@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + req);
//		
//		String jpql = "update Employee e set e.experience= :exp, e.skills= :sk where e.id=:empId"; 
//		
//		int updateCount = em.createQuery(jpql).setParameter("exp", req.getExperience()).setParameter("sk", req.getSkills()).setParameter("empId", userId).executeUpdate();
//		

		Employee em = empRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
		;
		em.setExperience(req.getExperience());
		em.getSkills().addAll(req.getSkills());

		return em.getId() + " Employee details changed Successfully";
	}

}

/*
 * 
 * private String firstName; private String lastName; private String email;
 * 
 * private double sscMarks;
 * 
 * private double hscMarks;
 * 
 * private double degreeMarks;
 * 
 * private String graduation;
 * 
 * private String branch;
 * 
 * private double experience;
 * 
 * private long contact;
 * 
 * private List<String> skills = new ArrayList<>();
 * 
 * 
 */

/*
 * private String companyName;
 * 
 * @Column(length = 100) private String companyAddress;
 * 
 * @Column(length = 10, nullable = false ) //@Range(max = 10 , min = 10) private
 * long companyContact;
 */
//private Gender gender ;
//private double sscMarks ; 
//private double hscMarks ; 
//private double degreeMarks ; 
//private String graduation ;
//private String branch ;
//private double experience ;
//private long contact;
//private List<String> skills=new ArrayList<>();
