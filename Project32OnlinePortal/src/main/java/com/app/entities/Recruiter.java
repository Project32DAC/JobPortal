package com.app.entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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
   

	@Column(length = 50, nullable = false) 
	private String companyName;
	@Column(length = 100) 
	private String companyAddress;
	@Column(length = 10, nullable = false ) 
    private long companyContact;

   
	@OneToMany(mappedBy="recruiter1",cascade = CascadeType.ALL)
	private List<Job> jobs=new ArrayList<>();
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL )
	@JoinColumn(name = "recruiterUser_id")
	@MapsId
	private UserEntity recruiterUser;
	
	
	
	
}
