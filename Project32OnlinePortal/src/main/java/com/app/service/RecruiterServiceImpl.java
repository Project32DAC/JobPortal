package com.app.service;



import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditRequest;
import com.app.entities.Employee;
import com.app.entities.Job;
import com.app.entities.Recruiter;
import com.app.entities.UserEntity;
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
		
		
		

		transientRecru.setRecruiterUser(user); 
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
	public Object viewJobApplications(long jobId) {
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
