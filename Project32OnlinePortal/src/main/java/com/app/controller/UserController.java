package com.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.IUserService;

@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
@CrossOrigin
@RequestMapping("/user")

public class UserController {
	// dep : user service i/f
	@Autowired
	private IUserService userService;

	public UserController() {
		System.out.println("in ctor of " + getClass());
	}

	// add REST API end point to serve list of users
	@GetMapping//http://localhost:8080/users in get method
	public ResponseEntity<?> fetchAllUsers() {
		System.out.println("in get all users");
		return  ResponseEntity.ok(userService.getAllUsers());//u can send object wrap in response entity //or with status code or see readme
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/employeefetch")//http://localhost:8080/users in get method
	public ResponseEntity<?> fetchAllEmployees() {
		System.out.println("in get all employess");
		return  ResponseEntity.ok(userService.getAllEmployees());//u can send object wrap in response entity //or with status code or see readme
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/recruiterfetch")//http://localhost:8080/users in get method
	public ResponseEntity<?> fetchAllRecruiters() {
		System.out.println("in get all recruiters");
		return  ResponseEntity.ok(userService.getAllRecruiters());//u can send object wrap in response entity //or with status code or see readme
	}
	

	@DeleteMapping("/delete/{userId}")
	public String deleteUserDetails(@PathVariable long userId) {
		System.out.println("in del user " + userId);
		return userService.deleteUserDetails(userId);
	}



}
