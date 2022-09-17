package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.RecruiterEditRequest;
import com.app.entities.Job;
import com.app.service.IRecruiterService;
import com.app.service.IUserService;


@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
@RequestMapping("/recruiter")
public class RecruiterController {
	@Autowired
	private IRecruiterService recService;

	@Autowired
	private IUserService userService; 
	
	

	// add REST API end point to serve list of users
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/edit/{id}")
	public ResponseEntity<?> recruiterEdit(@PathVariable long id , @RequestBody @Valid RecruiterEditRequest request) {
		System.out.println("in recruiter edit");
		

		return  ResponseEntity.ok(recService.editRecruiter(id,request));//u can send object wrap in response entity //or with status code or see readme
	} 
	
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/viewjobapplications/{jobId}")
	public ResponseEntity<?> viewJobApplications(@PathVariable long jobId){
		
		
		return  ResponseEntity.ok(recService.viewJobApplications(jobId));
		
	}
	
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/viewJobs/{recruId}")//1st show this on ui after that map that job with emplyeee using /viewjobapplications/{jobId}"
	public ResponseEntity<?> viewAllJobs(@PathVariable long recruId){ 
		
		
		return  ResponseEntity.ok(recService.viewAllJobs(recruId));
		
	}
	
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@DeleteMapping("/delete/{userId}")
	public String deleteUserDetails(@PathVariable long userId) {
		System.out.println("in del Recruiter " + userId);
		return userService.deleteUserDetails(userId);
	}
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/addjobs/{recruId}")
	public String changeRecruiterDetails(@PathVariable long recruId,@RequestBody @Valid List<Job>jobList) {
		System.out.println("in chnage Recruiter " + recruId);		
		
		System.out.println("iin controleer@@@@@@@@@@@@@@000000000000000000000000@@@@@@@@@ " + jobList);	
		
		return recService.addNewJobs(recruId, jobList);
	}
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@DeleteMapping("/deletejobs/{jobId}")
	public String deleteJobById(@PathVariable long jobId) {
		System.out.println("in chnage Employee " + jobId);		
			
		
		return recService.deleteJobById(jobId);
	}
	
	
	
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/selectcandidate/{empId}")
	public String callCandidate(@PathVariable long empId) {
		
		
		return recService.callCandidate(empId);
		
		
		
	}
	
	
	
	
	
	
	
		
}