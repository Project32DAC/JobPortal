package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Job;


public interface JobRepository extends JpaRepository<Job,Long>{

}
