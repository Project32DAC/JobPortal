package com.app.service;

import java.util.List;

import com.app.dto.ApiResponse;
import com.app.dto.UserLoginRequest;
import com.app.dto.UserLoginResponse;
import com.app.dto.UserSignupRequest;
import com.app.entities.User;

public interface IUserService {
	List<User> getAllUsers();

	UserLoginResponse login(UserLoginRequest request);
	
	String deleteUserDetails(long userId);
	
	ApiResponse registerNewUser(UserSignupRequest userDto);
	
}
