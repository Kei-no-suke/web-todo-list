package com.example.demo.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordUserRepository extends JpaRepository<PasswordUser, Integer>{
//	@Query("select p from PasswordUser p where p.user_id = :user_id")
//	Optional<PasswordUser> findByUserId(@Param("user_id") Integer userId);
	
	@Query("select p from PasswordUser p where p.email = :email")
	Optional<PasswordUser> findByEmail(@Param("email") String email);
	
	@Query("select exists( select p from PasswordUser p where p.email = :email )")
	Boolean existsByEmail(@Param("email") String email);
}
