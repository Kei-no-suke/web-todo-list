package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name="sessions")
public class Session {
	
	@Id
	@Column(name="session_id")
	private String sessionId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private User user;
	
	@Column(name="expired_date", nullable=false)
	private LocalDateTime expiredDate;
}
