package com.app.service;



import java.util.ArrayList;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditRequest;
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
		recruRepo.save(transientRecru);
		//jobRepo.saveAll(req.getJobs());
		
		
		for(Job j:req.getJobs()){
			
		Job jb=mapper.map(j,Job.class);
		System.out.println("**********11111111111"+jb);
			jobRepo.save(jb);
		}
		
		System.out.println("*******OurUser"+transientRecru);
		
		
		
		
		//transientRecru.setJobs(req.getJobs());
		
		
		
		
		
		return new ApiResponse(user.getFirstName()+" you have succesfully edited the details");
		
		
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
