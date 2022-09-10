package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude = {"role"})
@NoArgsConstructor
public class User extends BaseEntity {

	@Column(name = "first_name", length = 20)
	private String firstName;
	@Column(name = "last_name", length = 30) 
	private String lastName;
	@Column(length = 30, unique = true) 
	private String email;
	@Column(length = 20, nullable = false) 
	private String password;
	
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	private UserRole role ;


}
