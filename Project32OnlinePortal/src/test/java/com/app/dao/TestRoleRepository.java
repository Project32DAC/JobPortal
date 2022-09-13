//package com.app.dao;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.test.annotation.Rollback;
//
//import com.app.dto.UserRole;
//import com.app.entities.Role;
//import com.app.repository.RoleRepository;
//
//@DataJpaTest // to auto scan only DAO components
//@AutoConfigureTestDatabase(replace = Replace.NONE) 
//// To use def database (configured in app.props) for running test  cases
//class TestRoleRepository {
//	@Autowired
//	private RoleRepository roleRepo;
//
//	@Test
//	@Rollback(false)
//	void testAddRoleAdmin() {
//		System.out.println(roleRepo.save(new Role(UserRole.ROLE_ADMIN)));
//	}
//	@Test
//	@Rollback(false)
//	void testAddRoleCustomer() {
//		System.out.println(roleRepo.save(new Role(UserRole.ROLE_EMPLOYEE)));
//	}
//	@Test
//	@Rollback(false)
//	void testAddRoleUser() {
//		System.out.println(roleRepo.save(new Role(UserRole.ROLE_RECRUITER)));
//	}
//
//}
