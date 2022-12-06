package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Employee;

public interface AddressRepository extends JpaRepository<Employee,Long> {
	


}
