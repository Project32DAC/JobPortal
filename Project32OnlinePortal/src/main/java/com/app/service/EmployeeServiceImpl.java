package com.app.service;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.EmployeeDetailsResponseDTO;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeFullEditRequest;
import com.app.dto.ResumeResponseDTO;
import com.app.entities.Employee;
import com.app.entities.Recruiter;
import com.app.entities.UserEntity;
import com.app.repository.EmployeeRepository;
import com.app.repository.JobRepository;
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
	public ApiResponse editEmployee(long Employeeid, EmployeeEditRequest req /*, MultipartFile file*/) {
		// TODO Auto-generated method stub
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		UserEntity user = userRepo.findById(Employeeid)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
		Employee transientEmp = mapper.map(req, Employee.class); 
		
//		try {
//			byte [] byteArr = file.getBytes() ; 
//			transientEmp.setPhoto(byteArr); 
//		} catch (IOException e) {
//			e.getMessage() ;
//		}
//		
		
		
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
		String id = "./"+empId+".png";
	//	ByteArrayInputStream data = new ByteArrayInputStream(emp.getPhoto()) ;
		   
	    File newFile = new File(id);
	   
	    try (OutputStream outStream = new FileOutputStream(newFile)){
			 
			outStream.write(emp.getPhoto());
		
		} catch (IOException e) {
			e.getCause();
			e.getMessage();
		}
		

		ResumeResponseDTO rdto = new ResumeResponseDTO(user.getFirstName(), user.getLastName(), user.getEmail(),
				emp.getSscMarks(), emp.getHscMarks(), emp.getDegreeMarks(), emp.getGraduation(), emp.getBranch(),
				emp.getExperience(), emp.getContact(), newFile, emp.getSkills());


		return rdto;
	}

	@Override
	public List<Recruiter> searchJobByProfile(String jobProfile,Double exp) {

		System.out.println("in searchByJobProfile()");
	
		System.out.println("////////////////////////////////////"+jobProfile);
			
		String jpql = "select DISTINCT r from Recruiter r join fetch r.jobs j where j.jobProfile  LIKE '%'||:jP||'%' OR j.jobDescription  LIKE '%'||:jd||'%' OR  j.experience<=:exper";
		
		List<Recruiter> recruiters = em.createQuery(jpql, Recruiter.class).setParameter("jP", jobProfile.trim()).setParameter("jd",jobProfile.trim()).setParameter("exper",exp.doubleValue())
				.getResultList();
	
		System.out.println("**************/////" + recruiters);
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

			eService.sendSimpleEmail(emailDetails,
					"Dear" + " " + CandidateName + "," + "\r\n" + "\r\n" + "\r\n" + "\r\n"

							+ "Thank you for choosing Online Job Portal platform for appyling for jobs.\r\n"
							+ "The recruiter will be sure to reach out to you.\r\n"
							+ "Appreciate your interest and wishing you all the best.\r\n"
							+ "Thanks for applying for job !!!!\r\n You have successfully applied for job with JOBID :"
							+ jobId + "\r\nWe will get back to you soon....." + "\r\n" + "\r\n" + "\r\n" + "\r\n"
							+ "Best Regards,\r\n" + "Online Job Portal Project 32Team from Acts Pune",
					"Regarding your job appliction");

		}


		return "You have successfully applied for job with JOBID:" + jobId;
	}

	@Override
	public String changeEmployeeDetails(long userId, ChangeEmpRequestDTO req) {
		System.out.println("In service layer@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + req);
	
		Employee em = empRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
		;
		em.setExperience(req.getExperience());
		em.getSkills().addAll(req.getSkills());

		return em.getId() + " Employee details changed Successfully";
	}

	@Override
	public String setEmpImage(long id, MultipartFile file) {
		Employee emp = empRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Employee Id"));
		
		try {
		byte [] byteArr = file.getBytes() ; 
		emp.setPhoto(byteArr); 
		return "Successfully set image ....";
	} catch (IOException e) { 
		e.getMessage() ;
		return "failed to set image ....";
		
	}
	
	}

	@Override
	public Object employeeCompleteDetailsEdit(long id, @Valid EmployeeFullEditRequest request) { 
		int updateCount= 0 ;
		if(empRepo.existsById(id)) { 
			String jpql = "UPDATE Employee e set "+ " e.sscMarks= :ssc ," + " e.hscMarks= :hsc,"+
			" e.degreeMarks= :degreeM,"+"e.graduation =:grad,"+" e.branch= :br,"+ " e.contact= :cn where e.id = :eid "; 
			UserEntity user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("wrong user id")) ; 
			user.setFirstName(request.getFirstName());
			user.setLastName(request.getLastName()); 
			userRepo.save(user);
			
			 updateCount = em.createQuery(jpql).setParameter("ssc", request.getSscMarks()).setParameter("grad", request.getGraduation()).setParameter("hsc", request.getHscMarks()).setParameter("hsc", request.getHscMarks()).setParameter("eid", id)
			     .setParameter("degreeM", request.getDegreeMarks()).setParameter("br", request.getBranch()).setParameter("cn", request.getContact()).executeUpdate() ;
		}
		return updateCount;
	}

	@Override
	public Object viewEmployeeDetails(long empId) {
		Employee transientEmp =empRepo.findById(empId).orElseThrow(()->new ResourceNotFoundException("Invalid Employee Id"));;
		UserEntity transientUser=userRepo.findById(empId).orElseThrow(() -> new ResourceNotFoundException("wrong user id")) ;  
		
		EmployeeDetailsResponseDTO res = new EmployeeDetailsResponseDTO(transientUser.getFirstName(), transientUser.getLastName(),
				  transientEmp.getSscMarks(), transientEmp.getHscMarks(), transientEmp.getDegreeMarks(), transientEmp.getGraduation(), transientEmp.getBranch(), transientEmp.getContact()) ;
		
		return res;
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
