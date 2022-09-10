package com.app.dao;


import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entities.User;


public interface RoleRepository extends JpaRepository<User, Long> {
	//Optional<Role> findByRoleName(UserRole role);
	Set<User> findByRoleIn(Set<User> roles);//finder method
}
