package com.app.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = {"employeeUser","skills"})

public class Employee extends BaseEntity {
  
//	@Column(name = "first_name", length = 20)
//	private String firstName;
//	@Column(name = "last_name", length = 30) 
//	private String lastName;
//	@Column(length = 30, unique = true) 
//	private String email;
//	@Column(length = 20)//, nullable = false) 
//	private String password;
	@JsonIgnore
	@Enumerated(EnumType.STRING)
	@Column(length = 5)
	private Gender gender;
	@Column(length = 20)//, nullable = false) 
    private double sscMarks ; 
	@Column(length = 20)//, nullable = false) 
    private double hscMarks ; 
	@Column(length = 20)//, nullable = false) 
    private double degreeMarks ; 
	@Column(name = "graduation", length = 30) 
	private String graduation ; // need ENUM for validation 
	@Column(length = 20)//, nullable = false) 
	private String branch ;
	@Column(length = 20)//, nullable = false) 
    private double experience ;
	@Column(length = 10)//, nullable = false ) 
	@Range(min = 10)
    private long contact;
	@JsonIgnore
	@ElementCollection //to indicate collection of basic value types
	@CollectionTable(name = "employee_skills",joinColumns = @JoinColumn(name="employee_id"))
	@Column(name="skills",length = 20)
	private List<String> skills=new ArrayList<>();
	
	// CONSTRAINT `FK1d3x9av74ouh3lp4hnq9etnor` FOREIGN KEY (`employee_user_id`) REFERENCES `users` (`id`))
	
<<<<<<< HEAD
	@OneToOne(cascade=CascadeType.ALL)
=======
	@OneToOne(cascade = CascadeType.ALL)
>>>>>>> f016b139149d13823ccbdbb40c2c51e95044e0dc
	@JoinColumn(name = "employeeUser_id" /*nullable = false*/)
	@MapsId
	private UserEntity employeeUser;
	
	
	
}
