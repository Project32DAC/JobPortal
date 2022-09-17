package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.UserDTO;
import com.app.dto.UserLoginRequest;
import com.app.dto.UserLoginResponse;
import com.app.dto.UserRegResponse;

import com.app.entities.UserEntity;
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

	// mapper
	@Autowired
	private ModelMapper mapper;
	// password enc
	@Autowired
	private PasswordEncoder encoder;

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
		userRepo.deleteById(userId);
		return "deleted user details with id" + userId;
		
	} 
	
	@Override
	public Optional<UserEntity> findByEmail(String email) {
		Optional<UserEntity> user = userRepo.findByEmail(email) ; 
		
		return user ;
		
	}

	

}
