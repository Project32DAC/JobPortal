package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.UserDTO;
import com.app.dto.UserLoginRequest;
import com.app.dto.UserLoginResponse;
import com.app.dto.UserRegResponse;
import com.app.dto.UserRole;
import com.app.entities.Job;
import com.app.entities.Recruiter;
import com.app.entities.UserEntity;
import com.app.repository.EmployeeRepository;
import com.app.repository.RecruiterRepository;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;

@Service
@Transactional

public class UserServiceImpl implements IUserService {
	// dep : user repo n role repo
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private EmployeeRepository empRepo;
	
	@Autowired
	private RecruiterRepository recruRepo;

	// mapper
	@Autowired
	private ModelMapper mapper;
	// password enc
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private EntityManager em;
	
	
	
	@Autowired
	private EmailSenderService eService;

	@Override
	public UserRegResponse registerUser(UserDTO user) {
		// Objective : 1 rec inserted in users table n insert n recs in link table
		// user_roles
		// 1. Map dto --> entity
		UserEntity userEntity = mapper.map(user, UserEntity.class);
		// 2. Map Set<UserRole : enum> ---> Set<Role :entity> n assign it to the
		// transient user entity
		userEntity.setUserRole(roleRepo.findByRoleName(user.getRole()));
		// 3. encode pwd
		userEntity.setPassword(encoder.encode(user.getPassword()));
		// 4 : Save user details
		UserEntity persistentUser = userRepo.save(userEntity);
		
		String CandidateName=user.getFirstName()+" "+user.getLastName();
		String emailDetails=user.getEmail();
		String password=user.getPassword();
		
		eService.sendSimpleEmail(emailDetails,
				"Dear" + " " + CandidateName + "," + "\r\n" + "\r\n" + "\r\n" + "\r\n"

						+

"Thank you for registering to "+"ONLINE JOB PORTAL"+"\r\n"+

"We will send you a  notifications on this email regarding furhter updates "
+"\r\n"+
"Your Registred Mail = "+emailDetails +"\r\n"+
"Your Password = "+password +"\r\n"+
"Your UserId = "+persistentUser.getId()+"\r\n"+

"Please feel free to share the feedback....\r\n"
 
						
						 + "\r\n" + "\r\n" + "\r\n" + "\r\n"
						+ "Best Regards,\r\n" + "Online Job Portal Project 32Team from Acts Pune",
				"Successfully  Registred with Online Job Portal ");
		
		
		
		
		return new UserRegResponse("User registered successfully with ID " + persistentUser.getId());
	}

	@Override
	public List<UserEntity> getAllUsers() {
		// TODO Auto-generated method stub
		return  userRepo.findAll();
	}

	@Override
	public UserLoginResponse login(UserLoginRequest request) {
		UserEntity user = userRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials !!!!!!"));
		// => valid login
		// user : PERSISTENT
		// API of ModelMapper : public Object map(Object src,Class<T> destType)//source destination type
		// Mapping from Entity --> DTO
		UserLoginResponse resp = mapper.map(user, UserLoginResponse.class);
		// map Set<Role> ---> Set<String> to be sent to rhe clnt
//		user.getRole() // Set<Role>//front end la data pathvaycha aahe
//		                  //returning set of role and in that we r adding roles
//				.forEach(role -> resp.getRoleNames().add(role.getRoleName().name()));
		return resp;
	}

	@Override
	public String deleteUserDetails(long userId) {
		//asssume user id for emp 
		/**/
		UserEntity en=userRepo.findById(userId).get();
		if(en.getUserRole().getRoleName()==UserRole.ROLE_RECRUITER) {
			
			Recruiter recru =recruRepo.findById(userId).get();
			List<Job> jobList=recru.getJobs();
			for (Job j :jobList) {
				//native delete querey on emp_jobs table
				empRepo.RemoveAppliedEmployees(j.getId());
				
			}				
		}
		userRepo.deleteById(userId);
		return "deleted user details with id" + userId;
		
	} 
	
	@Override
	public Optional<UserEntity> findByEmail(String email) {
		Optional<UserEntity> user = userRepo.findByEmail(email) ; 
		
		return user ;
		
	}

	@Override
	public List<UserEntity> getAllEmployees() {
		List<UserEntity> listOfEmp=new ArrayList<UserEntity>();
	String jpql="Select u from UserEntity u where u.userRole.roleName=:emrole";
	listOfEmp=	em.createQuery(jpql,UserEntity.class).setParameter("emrole",UserRole.ROLE_EMPLOYEE).getResultList();
		
		//listOfEmp=userRepo.findAll();
		
		
		
		return listOfEmp;//.stream().filter(r->r.getUserRole().equals("ROLE_EMPLOYEE")).collect(Collectors.toList());
	}

	@Override
	public List<UserEntity> getAllRecruiters() {
		List<UserEntity> listOfRecru=new ArrayList<UserEntity>();
		String jpql="Select u from UserEntity u where  u.userRole.roleName=:recrurole";
		listOfRecru=em.createQuery(jpql, UserEntity.class).setParameter("recrurole",UserRole.ROLE_RECRUITER).getResultList();
		return listOfRecru;
	}

	

}
