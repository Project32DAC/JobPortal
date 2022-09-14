package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.RecruiterEditRequest;
import com.app.service.IRecruiterService;



@RestController // @Controller + @ResponseBody //i.e to pass respone in json so it is deserializon: added on ret types of req handling methods
@RequestMapping("/recruiter")
public class RecruiterController {
	@Autowired
	private IRecruiterService recService;

	

	// add REST API end point to serve list of users
	@PreAuthorize("hasRole('ROLE_RECRUITER')")
	@PostMapping("/edit/{id}")
	public ResponseEntity<?> recruiterEdit(@PathVariable long id , @RequestBody @Valid RecruiterEditRequest request) {
		System.out.println("in recruiter edit");
		

		return  ResponseEntity.ok(recService.editRecruiter(id,request));//u can send object wrap in response entity //or with status code or see readme
	}
}