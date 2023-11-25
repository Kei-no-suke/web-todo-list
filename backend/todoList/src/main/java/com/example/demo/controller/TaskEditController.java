package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.SendTaskFrontDto;
import com.example.demo.dto.request.TaskReqDto;
import com.example.demo.dto.response.TaskEditDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.model.Group;
import com.example.demo.model.Task;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("task-edit")
public class TaskEditController {
	
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;
	
	@RequestMapping(path="/", method=RequestMethod.POST)
	public TaskEditDto getTaskDetail(@RequestBody TaskReqDto taskReqDto, HttpServletRequest request){
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return dtoFactory.createTaskEditDto(null, null);
		}
		Task task = taskService.getTask(userId, taskReqDto.getTaskId());
		if(task == null) {
			return dtoFactory.createTaskEditDto(null, null);
		}
		List<Group> groups = groupService.getGroupList(userId);
		return dtoFactory.createTaskEditDto(task, groups);
	}
	
	@RequestMapping(path="/update", method=RequestMethod.POST)
	public Boolean updateTask(@RequestBody SendTaskFrontDto sendTaskFrontDto, HttpServletRequest request){
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return taskService.updateTask(userId, sendTaskFrontDto.getTaskFront());
	}
}
