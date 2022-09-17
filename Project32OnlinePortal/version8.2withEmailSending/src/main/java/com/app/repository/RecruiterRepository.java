package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Employee;
import com.app.entities.Recruiter;

public interface RecruiterRepository extends JpaRepository<Recruiter,Long> {

}
