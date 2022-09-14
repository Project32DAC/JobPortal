package com.app.dto;

import java.util.ArrayList;
import java.util.List;


import org.hibernate.validator.constraints.Range;

import com.app.entities.Gender;
import com.app.entities.Job;

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
public class RecruiterEditRequest {
	
	private String companyName;
	
	private String companyAddress;

	//@Range(min = 10)
    private long companyContact;
	
	private List<Job> jobs=new ArrayList<>();
}
