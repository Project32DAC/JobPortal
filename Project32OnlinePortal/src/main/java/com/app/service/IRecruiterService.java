package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditDtoResponse;
import com.app.dto.RecruiterEditRequest;
import com.app.dto.RecruiterFullEditRequest;
import com.app.entities.Job;

public interface IRecruiterService {

	public ApiResponse editRecruiter(long id,  RecruiterEditRequest request);

	public Object viewJobApplications(long jobId);

	Object viewAllJobs(long recruId);

	public String addNewJobs(long recruId, List<Job> jobList);

	public String deleteJobById(long jobId);

	public String callCandidate(long empId);

	public Object searchEmployeeBySkillsAndExp(String skills, Double exp);

	public Object recruiterCompleteDetailsEdit(long id,  RecruiterFullEditRequest request);

	public RecruiterEditDtoResponse viewRecruiterDetails(long recId);
	
	

	

}
