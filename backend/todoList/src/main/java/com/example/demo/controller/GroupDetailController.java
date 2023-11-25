package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.GroupReqDto;
import com.example.demo.dto.request.TaskReqDto;
import com.example.demo.dto.response.GroupDetailDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.model.Group;
import com.example.demo.model.Task;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("group-detail")
public class GroupDetailController {
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;
	
	@RequestMapping(path="/", method=RequestMethod.POST)
	public GroupDetailDto getGroupDetail(@RequestBody GroupReqDto groupReqDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return dtoFactory.createGroupDetailDto(null, null);
		}
		if(groupReqDto.getGroupId() == null) {
			return dtoFactory.createGroupDetailDto(null, null);
		}
		Group group = groupService.getGroup(userId, groupReqDto.getGroupId());
		if(group == null) {
			return dtoFactory.createGroupDetailDto(null, null);
		}
		List<Task> tasks = taskService.findTasksByGroupId(groupReqDto.getGroupId());
		
		return dtoFactory.createGroupDetailDto(group, tasks);
	}
	
	@RequestMapping(path="/remove", method=RequestMethod.POST)
	public Boolean removeTask(@RequestBody TaskReqDto taskReqDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null || taskReqDto.getTaskId() == null) {
			return false;
		}
		return taskService.registerTaskToGroup(userId, null, taskReqDto.getTaskId());
	}
	
	@RequestMapping(path="/delete", method=RequestMethod.POST)
	public Boolean deleteGroup(@RequestBody GroupReqDto groupReqDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null || groupReqDto.getGroupId() == null) {
			return false;
		}
		return groupService.deleteGroup(userId, groupReqDto.getGroupId());
	}
}
