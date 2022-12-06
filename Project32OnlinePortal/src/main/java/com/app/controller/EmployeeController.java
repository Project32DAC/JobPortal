package com.app.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeFullEditRequest;
import com.app.service.IEmployeeService;
import com.app.service.IUserService;

@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
@CrossOrigin()
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
		

		return  ResponseEntity.ok(empService.editEmployee(id,request ));//u can send object wrap in response entity //or with status code or see readme
	}  
	
	@PutMapping("/editcomplete/{id}")
	public ResponseEntity<?> employeeCompleteDetailsEdit(@PathVariable long id , @RequestBody @Valid EmployeeFullEditRequest request) {
		System.out.println("in employee edit");
		

		return  ResponseEntity.ok(empService.employeeCompleteDetailsEdit(id,request ));//u can send object wrap in response entity //or with status code or see readme
	} 
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@PostMapping("/setImage/{id}")
	public ResponseEntity<?> setEmpImage(@PathVariable long id , @RequestParam("image") MultipartFile file) {
		System.out.println("in employee edit");
		

		return  ResponseEntity.ok(empService.setEmpImage(id,file));//u can send object wrap in response entity //or with status code or see readme
	}
	
	
	@GetMapping("/generateresume/{id}")
	public ResponseEntity<?> generateResume(@PathVariable long id) {
		System.out.println("in generate resume");
		return ResponseEntity.status(HttpStatus.CREATED).body(empService.generateResume(id));
	}
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@GetMapping("/search/{jobProfile}/{exp}")
	public ResponseEntity<?> searchJobs(@PathVariable String jobProfile,@PathVariable Double exp) {
		System.out.println("in recruiter search");

        
		return  ResponseEntity.ok(empService.searchJobByProfile(jobProfile,exp));//u can send object wrap in response entity //or with status code or see readme
	}
	
	
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@GetMapping("/apply/{jId}/{eId}")
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
		return empService.changeEmployeeDetails(userId, request);
	}
	
	@PreAuthorize("hasRole('ROLE_EMPLOYEE')")
	@GetMapping("/viewEmpAllDetails/{empId}")
	public ResponseEntity<?> viewEmployeeDetails(@PathVariable long empId){
		
		
		return  ResponseEntity.ok(empService.viewEmployeeDetails(empId));
		
	}


}
