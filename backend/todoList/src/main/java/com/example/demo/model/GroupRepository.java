package com.example.demo.model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer>, JpaSpecificationExecutor<Group>{

	@Query(nativeQuery = true, value = "select * from groups where name = :name and user_id = :user_id")
	Optional<Group> findByName(@Param("name") String name, @Param("user_id") Integer userId);

	@Query(nativeQuery = true, value = "select * from groups where user_id = :user_id")
	Optional<List<Group>> findGroupsByUserId(@Param("user_id") Integer userId);
	
	@Query(nativeQuery = true, value = "select exists( select * from groups where name = :name and user_id = :user_id )")
	Boolean existsByGroupName(@Param("name") String name, @Param("user_id") Integer userId);
	
	@Query(nativeQuery = true, value = "select * from groups where name = :name and user_id = :user_id")
	Optional<Group> findByGroupName(@Param("name") String name, @Param("user_id") Integer userId);
}
