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
public class EmployeeFullEditRequest {
	
	
	private String firstName;
	
	private String lastName;



	private double sscMarks ; 
	
	private double hscMarks ; 
	
    private double degreeMarks ; 
	
    private String graduation ;
	
    private String branch ;

    private long contact; 

}
