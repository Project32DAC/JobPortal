package com.app.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import com.app.entities.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class UserSignupRequest /* extends BaseDto */{
	//To DO : add validation rules 
	@NotBlank(message = "first name is required")
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private UserRole userRole;
}
