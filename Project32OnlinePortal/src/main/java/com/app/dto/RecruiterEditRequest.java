package com.app.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
	
	@NotBlank(message = "companyName is required")
	private String companyName;
	@NotBlank(message = "companyAddress is required")
	private String companyAddress;

	@NotNull(message = "companyContact is required")
    private long companyContact;
	
	private List<Job> jobs=new ArrayList<>();
}
