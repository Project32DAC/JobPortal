package com.app.dto;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
	@NotNull(message = "Gender is required")
	private Gender gender ;
	@NotNull(message = "SscMarks is required")
	private double sscMarks ; 
	@NotNull(message = "HscMarks is required")
	private double hscMarks ; 
	@NotNull(message = "DegreeMarks is required")
    private double degreeMarks ; 
	@NotBlank(message = "Graduation is required")
    private String graduation ;
	@NotBlank(message = "Branch is required")
    private String branch ;
	@NotNull(message = "Experience is required")
    private double experience ;
  
 
	@NotNull(message = "Contact is required")
     private long contact; 
  
    private List<String> skills=new ArrayList<>();
}
