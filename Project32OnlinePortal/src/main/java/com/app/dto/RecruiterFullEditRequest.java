package com.app.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RecruiterFullEditRequest {

	private String firstName;

	private String lastName;
	
	private String companyName;
	
	private String companyAddress;

	
    private long companyContact;
	
	
}
