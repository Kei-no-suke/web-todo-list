package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskFront {
	Integer taskId;
	Integer userId;
	String groupName;
	String name;
	String detail;
	String deadline;
	String status;
	String docUrl;
}
