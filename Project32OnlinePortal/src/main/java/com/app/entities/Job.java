package com.app.entities;

import java.time.LocalDate;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Table(name = "jobs")
@NoArgsConstructor
@Setter
@Getter
@ToString(exclude = {"recruiter1"})
public class Job extends BaseEntity{
	@Column(name = "job_profile", length = 20)
	private String jobProfile;
	@Column(name = "vacancies", length = 30) 
	private int jobVacancy;
	@Column(name = "experience",length = 20) 
	private Double experience;
	@Column(name="pub_date")
	private LocalDate publishDate;	
	@Column(name = "job_description",length = 400)
	private String jobDescription;;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Recru_id")
	//@MapsId 
	@JsonIgnore
    private Recruiter recruiter1; 
	

	
	public Job(String jobProfile, int jobVacancy, Double experience) {
		super();
		this.jobProfile = jobProfile;
		this.jobVacancy = jobVacancy;
		this.experience = experience;
	}
}
