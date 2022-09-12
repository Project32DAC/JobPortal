package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserLoginRequest;
import com.app.dto.UserSignupRequest;
import com.app.entities.User;
import com.app.service.IUserService;

@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
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

	// add REST end point for user login
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid UserLoginRequest request) {
		System.out.println("in user login " + request);
		return ResponseEntity.ok(userService.login(request));
	}

	// delete user by id , by last name , by role name
	@DeleteMapping("/{userId}")
	public String deleteUserDetails(@PathVariable long userId) {
		System.out.println("in del user " + userId);
		return userService.deleteUserDetails(userId);
	}

	// add REST end point for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserSignupRequest request) {
		System.out.println("in reg user " + request);
		// return null;
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerNewUser(request));
	}

}
