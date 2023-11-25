package com.example.demo.model;

import java.time.LocalDate;

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
@Table(name="tasks")
public class Task {
	
	public Task(String name, String detail, Group group, User user, LocalDate deadline, String docUrl) {
		this.name = name;
		this.detail = detail;
		this.group = group;
		this.user = user;
		this.deadline = deadline;
		this.status = TaskStatus.UNTOUCHED.getIndex();
		this.docUrl = docUrl;
	}
	
	public Task(String name, String detail, Group group, User user, LocalDate deadline, TaskStatus status, String docUrl) {
		this.name = name;
		this.detail = detail;
		this.group = group;
		this.user = user;
		this.deadline = deadline;
		this.status = status.getIndex();
		this.docUrl = docUrl;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="task_id")
	private Integer taskId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="group_id", referencedColumnName="group_id")
	private Group group;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", referencedColumnName="user_id")
	private User user;
	
	@Column(nullable=false)
	private String name;
	
	@Column(nullable=true)
	private String detail;
	
	@Column(nullable=true)
	private LocalDate deadline;
	
	@Column(nullable=false)
	private Integer status;
	
	@Column(nullable=true, name="doc_url")
	private String docUrl;
}
