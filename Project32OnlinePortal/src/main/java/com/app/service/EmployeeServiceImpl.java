package com.app.service;



import javax.transaction.Transactional;

<<<<<<< HEAD
import org.modelmapper.ModelMapper;
=======
>>>>>>> f016b139149d13823ccbdbb40c2c51e95044e0dc
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

import com.app.entities.Employee;
import com.app.entities.UserEntity;
import com.app.repository.EmployeeRepository;
import com.app.repository.UserRepository;


@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService{ 
	@Autowired 
	UserRepository userRepo ; 
<<<<<<< HEAD
	@Autowired
	private ModelMapper mapper;
=======
	
>>>>>>> f016b139149d13823ccbdbb40c2c51e95044e0dc
	@Autowired
	EmployeeRepository empRepo ;
    
	@Override
<<<<<<< HEAD
	public ApiResponse editEmployee(long Employeeid,EmployeeEditRequest req) {
		// TODO Auto-generated method stub 
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		UserEntity user=userRepo.findById(Employeeid).orElseThrow(()->new ResourceNotFoundException("Invalid Employee Id"));
		Employee transientEmp=mapper.map(req,Employee.class);
		transientEmp.setEmployeeUser(user);
		empRepo.save(transientEmp);
		return new ApiResponse(user.getFirstName()+" you have succesfully edited the details");
		
=======
	public ApiResponse editEmployee(int id,Employee req) {
		// TODO Auto-generated method stub 
//		String jpql = "update employee e set e.gender= :gen"+ " e.sscMarks= :ssc" + " e.hscMarks= :hsc"+
//		" e.degreeMarks= :degreeM"+" e.branch= :br"+ " e.experience= :exp"+  " e.contact= :cn"+ " e.skills= :sk"; 
		if (userRepo.existsById((long) id)){
			empRepo.save(req); // id autogenerted automatically maps ......???????
			return new ApiResponse("Employee edited or added successfully...") ;
		  }
		throw new ResourceNotFoundException("user id not found ..!!!!") ;
>>>>>>> f016b139149d13823ccbdbb40c2c51e95044e0dc
		
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
