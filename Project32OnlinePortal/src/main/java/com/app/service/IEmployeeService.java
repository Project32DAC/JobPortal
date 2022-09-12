package com.app.service;

import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeEditResponse;

public interface IEmployeeService {
	public EmployeeEditResponse editEmployee(int id , EmployeeEditRequest req);

}
