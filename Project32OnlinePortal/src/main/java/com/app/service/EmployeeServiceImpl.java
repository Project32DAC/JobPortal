package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeEditResponse;
import com.app.entities.Gender;

@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService{

	@Override
	public EmployeeEditResponse editEmployee(int id , EmployeeEditRequest req) {
		// TODO Auto-generated method stub 
		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		
		return null;
	}

	

} 

//private Gender gender ;
//private double sscMarks ; 
//private double hscMarks ; 
//private double degreeMarks ; 
//private String graduation ;
//private String branch ;
//private double experience ;
//private long contact;
//private List<String> skills=new ArrayList<>();
