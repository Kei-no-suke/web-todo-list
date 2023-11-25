package com.example.demo.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.factory.TaskFactory;
import com.example.demo.model.Group;
import com.example.demo.model.GroupRepository;
import com.example.demo.model.Task;
import com.example.demo.model.TaskFront;
import com.example.demo.model.TaskRepository;

@Service
public class TaskService {
	@Autowired
	TaskRepository taskRepository;
	
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	TaskFactory taskFactory;
	
	// create
	public Boolean saveTask(Integer userId, TaskFront taskFront) {
		Task task = taskFactory.createTask(userId, taskFront);
		if(task != null) {
			taskRepository.save(task);
			return true;
		}else {
			return false;
		}
	}
	
	// read
	public List<Task> getTaskList(Integer userId){
		Optional<List<Task>> optTasks = taskRepository.findTasksByUserId(userId);
		if(!optTasks.isPresent()) {
			return null;
		}else {
			return optTasks.get();
		}
	}
	
	public Task getTask(Integer userId, Integer taskId) {
		Optional<Task> optOldTask = taskRepository.findById(taskId);
		if(!optOldTask.isPresent()) {
			return null;
		}
		
		if(!TaskDomainService.validateUserId(userId, optOldTask.get())) {
			return null;
		}
		
		return optOldTask.get();
	}
	
	public List<Task> findTasksByGroupId(Integer groupId){
		Optional<List<Task>> optTasks = taskRepository.findTasksByGroupId(groupId);
		if(!optTasks.isPresent()) {
			return null;
		}
		
		return optTasks.get();
	}
	
	public List<Task> getFilteredTasks(Integer userId, String groupName, String startDate, String endDate){
		Optional<List<Task>> optTasks;
		if(groupName == null) {
			optTasks = taskRepository.findTasksByUserId(userId);
		}else {
			Optional<Group> optGroup = groupRepository.findByName(groupName, userId);
			
			if(!optGroup.isPresent()) {
				return null;
			}
			
			optTasks = taskRepository.findTasksByGroupId(optGroup.get().getGroupId());
		}
		
		if(!optTasks.isPresent()) {
			return null;
		}
		
		if(startDate == null && endDate == null) {
			return optTasks.get();
		}
		
		LocalDate startLocalDate = null;
		LocalDate endLocalDate = null;
		
		if(startDate != null) {
			startLocalDate = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		if(endDate != null) {
			endLocalDate = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		
		List<Task> tasks = new ArrayList<>();
		
		for(Task task: optTasks.get()) {
			if(task.getDeadline() == null) {
				continue;
			}
			if(startDate == null) {
				if(endLocalDate.isAfter(task.getDeadline()) || endLocalDate.isEqual(task.getDeadline())) {
					tasks.add(task);
				}
			}else if(endDate == null) {
				if(startLocalDate.isBefore(task.getDeadline()) || startLocalDate.isEqual(task.getDeadline())) {
					tasks.add(task);
				}
			}else {
				if((startLocalDate.isBefore(task.getDeadline()) || startLocalDate.isEqual(task.getDeadline())) && (endLocalDate.isAfter(task.getDeadline()) || endLocalDate.isEqual(task.getDeadline()))) {
					tasks.add(task);
				}
			}
		}
		
		if(tasks.isEmpty()) {
			return null;
		}else {
			return tasks;
		}
	}
	
	// update
	public Boolean registerTaskToGroup(Integer userId, String groupName, Integer taskId ) {
		Task task = taskFactory.createTaskWithGroup(userId, groupName, taskId);
		
		if(task != null) {
			taskRepository.save(task);
			return true;
		}else {
			return false;
		}
	}
	
	public Boolean changeTaskStatus(Integer userId, String status, Integer taskId) {
		Task task = taskFactory.createTaskWithStatus(userId, status, taskId);
		
		if(task != null) {
			taskRepository.save(task);
			return true;
		}else {
			return false;
		}
	}
	
	public Boolean updateTask(Integer userId, TaskFront taskFront) {
		Task task = taskFactory.createUpdatedTask(userId, taskFront);
		
		if(task != null) {
			taskRepository.save(task);
			return true;
		}else {
			return false;
		}
	}
	
	// delete
	public Boolean deleteTask(Integer userId, Integer taskId) {
		Optional<Task> optTask = taskRepository.findById(taskId);
		
		if(!optTask.isPresent()) {
			return false;
		}
		
		if(!TaskDomainService.validateUserId(userId, optTask.get())) {
			return false;
		}
		
		taskRepository.deleteById(taskId);
		return true;
	}
}
