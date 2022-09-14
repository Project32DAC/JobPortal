package com.app.dto;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.app.entities.Gender;
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
public class EmployeeEditRequest {
	//@NotBlank(message = "gender is required")
	private Gender gender ;
	//@NotBlank(message = "sscMarks is required")
	private double sscMarks ; 
	//@NotBlank(message = "hscMarks is required")
	private double hscMarks ; 
	//@NotBlank(message = "degreeMarks is required")
    private double degreeMarks ; 
	//@NotBlank(message = "graduation is required")
    private String graduation ;
	//@NotBlank(message = "branch is required")
    private String branch ;
	//@NotBlank(message = "experience is required")
    private double experience ;
	//@NotBlank(message = "Contact is required")
    private long contact;
    
    private List<String> skills=new ArrayList<>();
}
