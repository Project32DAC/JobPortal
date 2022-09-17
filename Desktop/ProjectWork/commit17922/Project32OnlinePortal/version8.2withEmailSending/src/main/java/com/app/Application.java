package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
		
		//configure model mapper bean , with STRICT mapping instructions
		@Bean
		public ModelMapper mapper()
		{
			 ModelMapper modelMapper = new ModelMapper();
			 modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			 return modelMapper;
		}

}
