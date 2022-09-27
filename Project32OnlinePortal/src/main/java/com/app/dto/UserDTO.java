package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString(exclude = "role")
public class UserDTO {
	@JsonProperty(access = Access.READ_ONLY) // user id will be serialized n sent to clnt BUT it won't be read from clnt
												// n de-serialized
	private Long userId;
	@NotBlank(message = "first name must be supplied")
	private String firstName;
	@NotBlank(message = "last name must be supplied")
	private String lastName;
	@NotBlank(message = "email must be supplied")
	@Email(message = "Invalid email format")
	private String email;  
	@NotBlank(message = "password must be supplied")
	private String password;
	private UserRole role ;

}
