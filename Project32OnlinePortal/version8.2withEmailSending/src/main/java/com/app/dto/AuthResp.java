package com.app.dto;

import java.util.Optional;

import com.app.entities.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthResp {
	private String message; 
	private Optional<UserEntity> user ;
	private String jwt;
}
