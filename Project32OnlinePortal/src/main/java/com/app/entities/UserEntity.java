package com.app.entities;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@ToString(exclude ={"userRole","emp","recruiter"})
@OnDelete(action=OnDeleteAction.CASCADE)
public class UserEntity extends BaseEntity{
	
	@Column(length = 30)
	private String firstName;
	@Column(length = 30)
	private String lastName;
	@Column(length = 100, unique = true)
	private String email;
	@Column(length = 350)
	private String password;
	//@JsonIgnore
	@OneToOne//@JoinColumn(nullable = false)
	private Role userRole ;
	
	@JsonIgnore////////////////////////////////////**************************chechkthis
	@OneToOne(mappedBy = "employeeUser",cascade=CascadeType.ALL)
	private Employee emp;
	@JsonIgnore//17/9/22
	@OneToOne(mappedBy = "recruiterUser",cascade=CascadeType.ALL)
	private Recruiter recruiter;
	
	

}
