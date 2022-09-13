package com.app.service;



import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeEditResponse;
import com.app.dto.UserRegResponse;
import com.app.entities.Employee;
import com.app.repository.EmployeeRepository;
import com.app.repository.UserRepository;


@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService{ 
	@Autowired 
	UserRepository userRepo ; 
	
	@Autowired
	EmployeeRepository empRepo ;
    
	@Override
	public ApiResponse editEmployee(int id,Employee req) {
		// TODO Auto-generated method stub 
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		if (userRepo.existsById((long) id)){
			empRepo.save(req); // id autogenerted automatically maps ......???????
			return new ApiResponse("Employee edited or added successfully...") ;
		  }
		throw new ResourceNotFoundException("user id not found ..!!!!") ;
		
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
