package com.app.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegResponse {
	private String message;
	private LocalDateTime timeStamp;
	public UserRegResponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
	}

}
