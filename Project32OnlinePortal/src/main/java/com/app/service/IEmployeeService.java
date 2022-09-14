package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.EmployeeEditRequest;



public interface IEmployeeService {
	public ApiResponse editEmployee(long id , EmployeeEditRequest req);

}
