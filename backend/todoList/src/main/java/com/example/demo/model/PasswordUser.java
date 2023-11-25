package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="password_users")
public class PasswordUser {
	
	public PasswordUser(User user, String email, String password) {
		this.user = user;
		this.email = email;
		this.password = password;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="password_user_id")
	private Integer passwordUserId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private User user;
	
	@Column(nullable=false)
	private String email;
	
	@Column(nullable=false)
	private String password;
}
