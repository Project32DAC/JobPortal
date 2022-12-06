package com.app.service;




import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditDtoResponse;
import com.app.dto.RecruiterEditRequest;
import com.app.dto.RecruiterFullEditRequest;
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
public class RecruiterServiceImpl implements IRecruiterService{ 
	@Autowired 
	UserRepository userRepo ; 
	@Autowired
	private ModelMapper mapper;
	@Autowired
	RecruiterRepository recruRepo ;
	
	@Autowired
	EntityManager em ;
	@Autowired
	JobRepository jobRepo ;
	
	
	@Autowired
	EmployeeRepository empRepo; 
	
	@Autowired
	private EmailSenderService eService;
	
	
    
	@Override
	public ApiResponse editRecruiter(long Recruiterid,RecruiterEditRequest req) {
		System.out.println("*******in*****************************");
		// TODO Auto-generated method stub 
//		String jpql = "update Recruiter e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		UserEntity user=userRepo.findById(Recruiterid).orElseThrow(()->new ResourceNotFoundException("Invalid Recruiter Id"));
		Recruiter transientRecru=mapper.map(req,Recruiter.class);
		//ArrayList <Job> jList = mapper.map(req.getJobs(), Job.class);
		System.out.println("**********00000"+req.getJobs());
		
		
		

		transientRecru.setRecruiterUser(user); //
		transientRecru.setJobs(req.getJobs());
		
		
		
		//jobRepo.saveAll(req.getJobs());
		for(Job j:req.getJobs()){
			
		Job jb=mapper.map(j,Job.class);
		System.out.println("**********11111111111"+jb); 
		  jb.setRecruiter1(transientRecru);
			jobRepo.save(jb);
		}
		recruRepo.save(transientRecru);
		System.out.println("*******OurUser"+transientRecru);
		
				
		//transientRecru.setJobs(req.getJobs());
		
		return new ApiResponse(user.getFirstName()+" you have succesfully edited the details");
		
		
	}



	@Override
	public Object viewJobApplications(long jobId) {//in front of this select button to send mail to candidate ,calling for interview
		List<Employee> empList;
		
		
		
			String jpql="select e from Employee e join fetch e.jobs j where j.id= :jobId ";
			
			empList= em.createQuery(jpql,Employee.class).setParameter("jobId", jobId).getResultList() ;
			
		return empList;
	}



	@Override
	public Object viewAllJobs(long recruId) {
		System.out.println("In view *********all ********job");
		List<Job> jobList;
		Recruiter rec=recruRepo.findById(recruId).orElseThrow(()->new ResourceNotFoundException("Invalid Recruiter Id"));
		System.out.println("........................"+rec);		
		jobList =rec.getJobs();
		
		System.out.println(jobList);
		return jobList;
	}

	@Override
	public String addNewJobs(long recruId, List<Job> jobList) {
		if(recruRepo.existsById(recruId)) {
		Recruiter recruiter = recruRepo.
				 findById(recruId).orElseThrow(()->new ResourceNotFoundException("Invalid Recruiter Id"));
		
		//UserEntity user=userRepo.findById(recruId).orElseThrow(()->new ResourceNotFoundException("Invalid Recruiter Id"));
		
		for(Job j:jobList){
			
			Job jb=mapper.map(j,Job.class);
			System.out.println("**********11111111111"+jb); 
			  jb.setRecruiter1(recruiter);
				//jobRepo.save(jb);
				recruiter.getJobs().addAll(jobList); 
		}
		
		//recruiter.setRecruiterUser(user);
		
	//	recruiter.getJobs().addAll(jobList); 
		   return "Successfully added new jobs...with Recruiter id :"+recruId ;
		}
		throw new ResourceNotFoundException("Invalid Recruiter Id") ;
		
	}



	@Override
	public String deleteJobById(long jobId) {
		if(jobRepo.existsById(jobId)) {
			jobRepo.deleteById(jobId); 
			return "Job Deleted Succesfully with job ID :"+ jobId;
		}
		return "Failed to delete NO matching job id";
	}



	@Override
	public String callCandidate(long empId) {
		
		Employee em=empRepo.findById(empId).orElseThrow(()->new ResourceNotFoundException("Invalid Employee Id"));
		String CandidateName=em.getEmployeeUser().getFirstName()+"  "+em.getEmployeeUser().getLastName();
		String emailDetails=em.getEmployeeUser().getEmail();
		
		
		eService.sendSimpleEmail(emailDetails,
				 "Dear"+" " +CandidateName+","+"\r\n"
						 +"\r\n"
						 +"\r\n"
					
						 +"\r\n"+
						 

 "This is a response to your job application where in you"
+ "expressed interest in employment with our company.\r\n"
+ "After going through your application, we have found you suitable for this job and therefore, we have arranged for a face-to-face interview.\r\n"
+ "We would like you to invite for an interview with us which is scheduled on next week  at the Pune office.\r\n"
+ "You are requested to reach the venue 30 minutes prior for some paperwork.\r\n"
+"\r\n"
+"\r\n"
+"\r\n"+

"Best Regards,\r\n"
				+ "Online Job Portal Project 32Team from Acts Pune" , "Congrats!!!You are shortlisted for interview round");
		
		
		return "Mail successfully send to candidate regarding interview call";
	}

//search for employee

	@Override
	public List<Employee> searchEmployeeBySkillsAndExp(String skill, Double exp) {
		List<Employee>empList = new ArrayList<Employee>();
		 
		List<Long> empIdList=empRepo.findAllEmployeesBySkill(skill.trim());
		 
		 System.out.println("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"+empIdList);
		 
		 String jpql = "select e from Employee e where  e.id =:empid";
		 
		 
		 for (Long var:empIdList) {

			 empList.add( em.createQuery(jpql,Employee.class).setParameter("empid", var).getSingleResult());			 
		 }
		 System.out.println("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"+empList);
	   
		return empList.stream().filter(e->e.getExperience()>=exp.doubleValue()).collect(Collectors.toList());
	}



	@Override
	public Object recruiterCompleteDetailsEdit(long id, @Valid RecruiterFullEditRequest request) {
		int updateCount= 0 ;
		if(recruRepo.existsById(id)) { 
			String jpql = "UPDATE Recruiter r set "+ " r.companyName= :cname ," + " r.companyAddress= :adrs,"+
			" r.companyContact= :cc"+" where r.id = :rid "; 
			UserEntity user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("wrong user id")) ; 
			
			
			user.setFirstName(request.getFirstName());
			user.setLastName(request.getLastName()); 
			
			userRepo.save(user);
			
			 updateCount = em.createQuery(jpql).setParameter("cname", request.getCompanyName()).setParameter("adrs", request.getCompanyAddress()).setParameter("cc", request.getCompanyContact()).setParameter("rid", id).
	               executeUpdate() ;
			 return updateCount;
		}
		throw new ResourceNotFoundException("Invalid recruiter id");
		

	}



	@Override
	public RecruiterEditDtoResponse viewRecruiterDetails(long recId) {
		
		Recruiter transientRec =recruRepo.findById(recId).orElseThrow(()->new ResourceNotFoundException("Invalid Recruiter Id"));;
		UserEntity transientUser=userRepo.findById(recId).orElseThrow(() -> new ResourceNotFoundException("wrong user id")) ; 
		
		RecruiterEditDtoResponse resp= new RecruiterEditDtoResponse(transientUser.getFirstName(),transientUser.getLastName(),transientRec.getCompanyName(),transientRec.getCompanyAddress(),transientRec.getCompanyContact());
	
		return resp;
	}

	

} 

//private Gender gender ;
//private double sscMarks ; 
//private double hscMarks ; 
//private double degreeMarks ; 
//private String graduation ;
//private String branch ;
//private double experience ;
//private long contact;
//private List<String> skills=new ArrayList<>();
