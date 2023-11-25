package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.RegisterGroupDto;
import com.example.demo.dto.request.RegisterStatusDto;
import com.example.demo.dto.request.TaskReqDto;
import com.example.demo.dto.response.TaskDetailDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.model.Group;
import com.example.demo.model.Task;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("task-detail")
public class TaskDetailController {
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;
	
	@RequestMapping(path="/", method=RequestMethod.POST)
	public TaskDetailDto getTaskDetail(@RequestBody TaskReqDto taskReqDto, HttpServletRequest request){
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return dtoFactory.createTaskDetailDto(null, null);
		}
		Task task = taskService.getTask(userId, taskReqDto.getTaskId());
		if(task == null) {
			return dtoFactory.createTaskDetailDto(null, null);
		}
		List<Group> groups = groupService.getGroupList(userId);
		return dtoFactory.createTaskDetailDto(task, groups);
	}
	
	@RequestMapping(path="/change-status", method=RequestMethod.POST)
	public Boolean changeTaskStatus(@RequestBody RegisterStatusDto registerStatusDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return taskService.changeTaskStatus(userId, registerStatusDto.getStatus(), registerStatusDto.getTaskId());
	}
	
	@RequestMapping(path="/register", method=RequestMethod.POST)
	public Boolean registerTaskToGroup(@RequestBody RegisterGroupDto registerGroupDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return taskService.registerTaskToGroup(userId, registerGroupDto.getGroupName(), registerGroupDto.getTaskId());
	}
	
	@RequestMapping(path="/delete", method=RequestMethod.POST)
	public Boolean deleteTask(@RequestBody TaskReqDto taskReqDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return taskService.deleteTask(userId, taskReqDto.getTaskId());
	}
}
