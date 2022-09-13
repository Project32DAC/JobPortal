package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.EmployeeEditResponse;
import com.app.entities.Employee;

public interface IEmployeeService {
	public ApiResponse editEmployee(int id , Employee req);

}
