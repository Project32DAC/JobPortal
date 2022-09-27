package com.app.repository;

import java.util.List;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Employee;
import com.app.entities.Job;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
                @Query(
			  value = "select distinct employee_id from employee_skills where skills LIKE '%'||:skls||'%'", 
			  nativeQuery = true)
			  List<Long> findAllEmployeesBySkill(@Param("skls") String skls);
      
                
                //find job  by employee id
                @Query("select e.jobs from Employee e where e.id=?1 ")
                List<Job>findJobsByEmployee(long id);
                
                @Modifying
                @Transactional
                @Query(
           			  value = "delete from emp_jobs where job_id=?1", 
           			  nativeQuery = true)
           			  void RemoveAppliedEmployees(@Param("job_id") Long job_id);
                
}
