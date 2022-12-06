package com.app.dto;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponseDTO {

	private String firstName;
	private String lastName;
	private String email;

	private double sscMarks;

	private double hscMarks;

	private double degreeMarks;

	private String graduation;

	private String branch;

	private double experience;

	private long contact; 
	
	private File photo ;

	private List<String> skills = new ArrayList<>();

}
