package com.app.service;



import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.app.dto.UserDTO;
import com.app.dto.UserLoginRequest;
import com.app.dto.UserLoginResponse;
import com.app.dto.UserRegResponse;

import com.app.entities.UserEntity;

public interface IUserService {
	List<UserEntity> getAllUsers();

	UserLoginResponse login(UserLoginRequest request);
	
	String deleteUserDetails(long userId);
	
	UserRegResponse registerUser(UserDTO user);

	Optional<UserEntity> findByEmail(String email);

	
	

}
