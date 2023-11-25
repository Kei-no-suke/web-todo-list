package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.SendTaskFrontDto;
import com.example.demo.dto.response.TaskCreateDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.model.Group;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("task-create")
public class TaskCreateController {
	
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;
	
	@RequestMapping(path="/", method=RequestMethod.GET)
	public TaskCreateDto displayTaskCreate(HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return dtoFactory.createTaskCreateDto(null);
		}
		List<Group> groups = groupService.getGroupList(userId);
		return dtoFactory.createTaskCreateDto(groups);
	}
	
	@RequestMapping(path="/create", method=RequestMethod.POST)
	public Boolean saveTask(@RequestBody SendTaskFrontDto sendTaskFrontDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return taskService.saveTask(userId, sendTaskFrontDto.getTaskFront());
	}
}
