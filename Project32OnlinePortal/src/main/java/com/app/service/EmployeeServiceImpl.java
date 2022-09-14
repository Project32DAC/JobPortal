package com.app.service;



import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.EmployeeEditRequest;
import com.app.dto.EmployeeEditResponse;

import com.app.entities.Employee;
import com.app.entities.UserEntity;
import com.app.repository.EmployeeRepository;
import com.app.repository.UserRepository;


@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService{ 
	@Autowired 
	UserRepository userRepo ; 
	@Autowired
	private ModelMapper mapper;
	@Autowired
	EmployeeRepository empRepo ;
    
	@Override
	public ApiResponse editEmployee(long Employeeid,EmployeeEditRequest req) {
		// TODO Auto-generated method stub 
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		UserEntity user=userRepo.findById(Employeeid).orElseThrow(()->new ResourceNotFoundException("Invalid Employee Id"));
		Employee transientEmp=mapper.map(req,Employee.class);
		transientEmp.setEmployeeUser(user);
		empRepo.save(transientEmp);
		return new ApiResponse(user.getFirstName()+" you have succesfully edited the details");
		
		
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
