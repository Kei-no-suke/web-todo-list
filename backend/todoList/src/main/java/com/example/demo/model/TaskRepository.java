package com.example.demo.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>{
	@Query(nativeQuery = true, value = "select * from tasks where user_id = :user_id")
	Optional<List<Task>> findTasksByUserId(@Param("user_id") Integer userId);
	
	@Query(nativeQuery = true, value = "select * from tasks where group_id = :group_id")
	Optional<List<Task>> findTasksByGroupId(@Param("group_id") Integer GroupId);
}
