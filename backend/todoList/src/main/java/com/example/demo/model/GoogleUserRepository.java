package com.example.demo.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoogleUserRepository extends JpaRepository<GoogleUser, Integer>{
//	@Query("select g from GoogleUser g where g.user_id = :user_id")
//	Optional<GoogleUser> findByUserId(@Param("user_id") Integer userId);
}
