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
@Table(name="groups")
public class Group {
	public Group(User user, String name, String detail) {
		this.user = user;
		this.name = name;
		this.detail = detail;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="group_id")
	private Integer groupId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private User user;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=false)
	private String detail;
}
