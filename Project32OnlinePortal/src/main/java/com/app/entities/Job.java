package com.app.entities;

import javax.persistence.Column;
import javax.persistence.*;
@Entity
public class Job extends BaseEntity{
	@Column(name = "job_profile", length = 20)
	private String jobProfile;
	@Column(name = "vacancies", length = 30) 
	private int jobVacancy;
	@Column(name = "experience",length = 20, nullable = false) 
	private Double experience;
	@ManyToOne
	@JoinColumn(name="recruiter_id")
	
    private Recruiter recruiter;
}
