package com.app.service;



import java.util.List;

import javax.validation.Valid;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.ChangeEmpRequestDTO;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeFullEditRequest;
import com.app.dto.ResumeResponseDTO;
import com.app.entities.Recruiter;



public interface IEmployeeService {
	
	public ResumeResponseDTO generateResume(long empId );
	
	
	public Object applyJob(long jobId, long empId);
	
	String changeEmployeeDetails(long userId, ChangeEmpRequestDTO req);
	public ApiResponse editEmployee(long id, @Valid EmployeeEditRequest request);
	public String setEmpImage(long id, MultipartFile file);
	List<Recruiter> searchJobByProfile(String jobProfile, Double exp);


	public Object employeeCompleteDetailsEdit(long id, @Valid EmployeeFullEditRequest request);


	public Object viewEmployeeDetails(long empId);
	

}
