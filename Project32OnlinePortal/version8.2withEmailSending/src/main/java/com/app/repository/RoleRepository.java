package com.app.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.UserRole;
import com.app.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
 //find by role : enum
	Role  findByRoleName(UserRole role);
	//Set<Role> findByRoleNameIn(Set<UserRole> roles);
}
