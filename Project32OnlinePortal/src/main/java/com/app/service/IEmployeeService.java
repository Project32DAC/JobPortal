package com.app.service;



import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.EmployeeEditRequest;

import com.app.dto.ResumeResponseDTO;
import com.app.entities.Recruiter;



public interface IEmployeeService {
	public ApiResponse editEmployee(long id , EmployeeEditRequest req);
	public ResumeResponseDTO generateResume(long empId );
	public List<Recruiter> searchJobByProfile(String jobProfile);
	
	public Object applyJob(long jobId, long empId);

}
