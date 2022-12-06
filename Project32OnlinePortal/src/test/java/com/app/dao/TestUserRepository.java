package com.app.dao;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.app.entities.Employee;
import com.app.repository.EmployeeRepository;
import com.app.repository.JobRepository;
import com.app.repository.UserRepository;
import com.app.service.IUserService;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class TestUserRepository {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private EmployeeRepository empRepo;
	@Autowired
	private JobRepository jobRepo;

//	@Test
//	void testFindByEmail() {
//		System.out.println(
//				userRepo.findByEmail("s@gmail.com").orElseThrow(() -> new RuntimeException("invalid user email")));
//	}
//	@Test
//	@Rollback 
//	void testFindJobsByEmployee() {
//		System.out.println(
//				empRepo.findJobsByEmployee(3));
//		Employee e=empRepo.findById(3L).get();
//		e.getJobs().stream().forEach(j->jobRepo.delete(j));
//	}
	
	@Test
	void testDeleteEmpDetails() {
	userRepo.deleteById(3L);
	}

}
