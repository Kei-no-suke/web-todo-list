package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;

public class TaskDomainService {
	
	public static Boolean validateStatus(String status) {
		if(TaskStatus.getStatusByText(status) != null) {
			return true;
		}else {
			return false;
		}
	}
	
	public static Boolean validateUserId(Integer userId, Task task) {
		if(userId == task.getUser().getUserId()) {
			return true;
		}else {
			return false;
		}
	}
}
