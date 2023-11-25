package com.example.demo.factory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.Group;
import com.example.demo.model.GroupRepository;
import com.example.demo.model.Task;
import com.example.demo.model.TaskFront;
import com.example.demo.model.TaskRepository;
import com.example.demo.model.TaskStatus;
import com.example.demo.model.User;
import com.example.demo.model.UserRepository;
import com.example.demo.service.TaskDomainService;

@Component
public class TaskFactory {
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TaskRepository taskRepository;
	
	public Task createTask(Integer userId, TaskFront taskFront) {
		Optional<Group> optGroup;
		Group group = null;
		
		if(taskFront.getGroupName() != null) {
			optGroup = groupRepository.findByName(taskFront.getGroupName(), userId);
			if(optGroup.isPresent()) {
				group = optGroup.get();
			}
		}
		
		Optional<User> optUser = userRepository.findById(userId);
		User user;
		if(optUser.isPresent()) {
			user = optUser.get();
		}else {
			return null;
		}
		
		LocalDate deadline = null;
		if(taskFront.getDeadline() != null) {
			deadline = LocalDate.parse(taskFront.getDeadline(), DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		
		Task task = new Task(taskFront.getName(), taskFront.getDetail(), group, user, deadline, taskFront.getDocUrl());
		
		return task;
	}
	
	public Task createTaskWithGroup(Integer userId, String groupName, Integer taskId) {
		Optional<Task> optTask = taskRepository.findById(taskId);
		Task oldTask;
		if(optTask.isPresent()) {
			oldTask = optTask.get();
		}else {
			return null;
		}
		
		if(!TaskDomainService.validateUserId(userId, oldTask)) {
			return null;
		}
		
		Optional<Group> optGroup;
		Group group = null;
		
		if(groupName != null) {
			optGroup = groupRepository.findByName(groupName, userId);
			if(optGroup.isPresent()) {
				group = optGroup.get();
			}else {
				group = oldTask.getGroup();
			}
		}
		
		Task task = new Task(oldTask.getTaskId(), group, oldTask.getUser(), oldTask.getName(), oldTask.getDetail(), oldTask.getDeadline(), oldTask.getStatus(), oldTask.getDocUrl());
		
		return task;
	}
	
	public Task createTaskWithStatus(Integer userId, String status, Integer taskId) {
		Optional<Task> optTask = taskRepository.findById(taskId);
		Task oldTask;
		if(optTask.isPresent()) {
			oldTask = optTask.get();
		}else {
			return null;
		}
		
		if(!TaskDomainService.validateUserId(userId, oldTask)) {
			return null;
		}
		
		if(!TaskDomainService.validateStatus(status)) {
			return null;	
		}
		
		Integer statusIndex = TaskStatus.getStatusByText(status).getIndex();
		
		Task task = new Task(oldTask.getTaskId(), oldTask.getGroup(), oldTask.getUser(), oldTask.getName(), oldTask.getDetail(), oldTask.getDeadline(), statusIndex, oldTask.getDocUrl());
		
		return task;
	}
	
	public Task createUpdatedTask(Integer userId, TaskFront taskFront) {
		Optional<Task> optTask = taskRepository.findById(taskFront.getTaskId());
		Task oldTask;
		if(optTask.isPresent()) {
			oldTask = optTask.get();
		}else {
			return null;
		}
		
		if(!TaskDomainService.validateUserId(userId, oldTask)) {
			return null;
		}
		
		if(!TaskDomainService.validateStatus(taskFront.getStatus())) {
			return null;	
		}
		
		Optional<Group> optGroup;
		Group group = null;
		
		if(taskFront.getGroupName() != null) {
			optGroup = groupRepository.findByName(taskFront.getGroupName(), userId);
			if(optGroup.isPresent()) {
				group = optGroup.get();
			}else {
				group = oldTask.getGroup();
			}
		}
		
		Optional<User> optUser = userRepository.findById(userId);
		User user;
		if(optUser.isPresent()) {
			user = optUser.get();
		}else {
			return null;
		}
		
		LocalDate deadline = null;
		if(taskFront.getDeadline() != null) {
			deadline = LocalDate.parse(taskFront.getDeadline(), DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		
		Integer status = TaskStatus.getStatusByText(taskFront.getStatus()).getIndex();
		
		Task task = new Task(taskFront.getTaskId(), group, user, taskFront.getName(), taskFront.getDetail(), deadline, status, taskFront.getDocUrl());
		
		return task;
	}
}
