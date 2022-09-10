package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
//add user authentication method : finder method
	Optional<User> findByEmailAndPassword(String em, String pass);

	
//
//	@Query("select u from User u join fetch u.address a where u.id=?1")
//	Optional<User> getUserNAddressDetails(long userId);

}
