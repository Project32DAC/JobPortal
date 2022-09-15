package com.app.service;

import javax.validation.Valid;

import com.app.dto.ApiResponse;
import com.app.dto.RecruiterEditRequest;

public interface IRecruiterService {

	public ApiResponse editRecruiter(long id, @Valid RecruiterEditRequest request);

	

	



	public Object viewJobApplications(long jobId);







	







	Object viewAllJobs(long recruId);

}
