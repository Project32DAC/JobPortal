package com.app.service;

import com.app.dto.ApiResponse;
<<<<<<< HEAD
import com.app.dto.EmployeeEditRequest;



public interface IEmployeeService {
	public ApiResponse editEmployee(long id , EmployeeEditRequest req);
=======
import com.app.dto.EmployeeEditResponse;
import com.app.entities.Employee;

public interface IEmployeeService {
	public ApiResponse editEmployee(int id , Employee req);
>>>>>>> f016b139149d13823ccbdbb40c2c51e95044e0dc

}
