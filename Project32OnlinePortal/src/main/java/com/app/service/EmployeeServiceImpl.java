package com.app.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService{

	@Override
	public boolean insertEmployee(int id) {
		// TODO Auto-generated method stub
		String jpql="insert into Employee(firstName,lastName,email,password,sscMarks,hscMarks,degreeMarks,graduation,branch,experience,contact) values ()";
		
		return false;
	}

}
