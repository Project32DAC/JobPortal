package com.app.entities;

import java.util.List;

import javax.persistence.*;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Table(name = "jobs")
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = "recruiter1")
public class Job extends BaseEntity{
	@Column(name = "job_profile", length = 20)
	private String jobProfile;
	@Column(name = "vacancies", length = 30) 
	private int jobVacancy;
	@Column(name = "experience",length = 20) 
	private Double experience;
	@ManyToOne
	@JoinColumn(name = "Recru_id")
	//@MapsId
    private Recruiter recruiter1;
}
