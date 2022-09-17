package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditRequest;
import com.app.entities.Job;

public interface IRecruiterService {

	public ApiResponse editRecruiter(long id, @Valid RecruiterEditRequest request);

	public Object viewJobApplications(long jobId);

	Object viewAllJobs(long recruId);

	public String addNewJobs(long recruId, @Valid List<Job> jobList);

	public String deleteJobById(long jobId);

	public String callCandidate(long empId);

	

}
