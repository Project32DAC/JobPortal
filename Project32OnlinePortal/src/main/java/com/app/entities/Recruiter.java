package com.app.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;

import javax.persistence.Column;
import com.app.entities.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import org.hibernate.validator.constraints.Range;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "recruiters")
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = {"recruiterUser","jobs"})
public class Recruiter extends BaseEntity {
   
//	@Column(name = "first_name", length = 20)
//	private String firstName;
//	@Column(name = "last_name", length = 30) 
//	private String lastName;
//	@Column(length = 20, nullable = false) 
//	private String password;
	@Column(length = 50, nullable = false) 
	private String companyName;
	@Column(length = 100) 
	private String companyAddress;
	@Column(length = 10, nullable = false ) 
	//@Range(max = 10 , min = 10)
    private long companyContact;
	//@JsonIgnore
	
	//@ElementCollection 
	/*@CollectionTable(name = "recruiter_jobs",joinColumns = @JoinColumn(name="recruiter_id"))
	@Column(name="jobs",length = 20)
	@OneToMany(cascade = CascadeType.ALL) 
	private List<Job> jobs=new ArrayList<>();*/
	
//	@JsonIgnore
//	@ElementCollection //to indicate collection of basic value types
//	@CollectionTable(name = "recruiter_jobs",joinColumns = @JoinColumn(name="recruiter_id"))
   
	@OneToMany(mappedBy="recruiter1",cascade = CascadeType.ALL /*, fetch = FetchType.EAGER*/)
	private List<Job> jobs=new ArrayList<>();//*****************************************
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL )
	@JoinColumn(name = "recruiterUser_id"/*, nullable = false*/)
	@MapsId
	private UserEntity recruiterUser;
	
	
	
	
}
