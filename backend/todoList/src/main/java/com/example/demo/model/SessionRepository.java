package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, String>{
	@Query(nativeQuery = true, value = "select * from sessions where user_id = :user_id")
	Session findByUserId(@Param("user_id") Integer userId);
}
