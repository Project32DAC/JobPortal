package com.app.controller;

import java.util.List;

import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.EmployeeEditRequest;

import com.app.entities.Recruiter;
import com.app.service.EmailSenderService;
import com.app.service.IEmployeeService;
import com.app.service.IUserService;

@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
@RequestMapping("/employee")
public class EmployeeController {
	@Autowired
	private IEmployeeService empService;
	
	@Autowired
	private IUserService userService;

	// add REST API end point to serve list of users
	@PostMapping("/edit/{id}")
	public ResponseEntity<?> employeeEdit(@PathVariable long id , @RequestBody @Valid EmployeeEditRequest request) {
		System.out.println("in employee edit");
		

		return  ResponseEntity.ok(empService.editEmployee(id,request));//u can send object wrap in response entity //or with status code or see readme
	}
	
	
	@PostMapping("/generateresume/{id}")
	public ResponseEntity<?> generateResume(@PathVariable long id) {
		System.out.println("in generate resume");
		return ResponseEntity.status(HttpStatus.CREATED).body(empService.generateResume(id));
	}
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@PostMapping("/search/{jobProfile}")
	public ResponseEntity<?> searchJobs(@PathVariable String jobProfile) {
		System.out.println("in recruiter search");
//		
//        List<Recruiter> o = empService.searchJobByProfile(jobProfile) ; 
//        System.out.println(o);
        
		return  ResponseEntity.ok(empService.searchJobByProfile(jobProfile));//u can send object wrap in response entity //or with status code or see readme
	}
	
	
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@PostMapping("/apply/{jId}/{eId}")
	public ResponseEntity<?> applyJob(@PathVariable int jId,@PathVariable int eId) {
		
		
		
		
		return ResponseEntity.ok(empService.applyJob(jId, eId));

	}
	
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@DeleteMapping("/delete/{userId}")
	public String deleteUserDetails(@PathVariable long userId) {
		System.out.println("in del Employee " + userId);
		return userService.deleteUserDetails(userId);
	}
	
	
	
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@PutMapping("/change/{userId}")
	public String changeEmployeeDetails(@PathVariable long userId,@RequestBody @Valid ChangeEmpRequestDTO request) {
		System.out.println("in chnage Employee " + userId);		
		
		System.out.println("iin controleer@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ " + request);	
		
		return empService.changeEmployeeDetails(userId, request);
	}
	
	

//	// add REST end point for user login
//	@PostMapping("/signin")
//	public ResponseEntity<?> authenticateUser(@RequestBody @Valid UserLoginRequest request) {
//		System.out.println("in user login " + request);
//		return ResponseEntity.ok(userService.login(request));
//	}
//
//	// delete user by id , by last name , by role name
//	@DeleteMapping("/{userId}")
//	public String deleteUserDetails(@PathVariable long userId) {
//		System.out.println("in del user " + userId);
//		return userService.deleteUserDetails(userId);
//	}
//
//	// add REST end point for user registration
//	@PostMapping("/signup")
//	public ResponseEntity<?> registerUser(@RequestBody @Valid UserSignupRequest request) {
//		System.out.println("in reg user " + request);
//		// return null;
//		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerNewUser(request));
//	}
	

}
