package com.app.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class UserLoginRequest {
	@NotBlank(message = "email is required")
	private String email;
	@NotBlank(message = "password is required")
	private String password;
}
