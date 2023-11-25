package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.GroupReqDto;
import com.example.demo.dto.request.SendGroupFrontDto;
import com.example.demo.dto.response.GroupEditDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.model.Group;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("group-edit")
public class GroupEditController {
	
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;
	
	@RequestMapping(path="/", method=RequestMethod.POST)
	public GroupEditDto getGroupDetail(@RequestBody GroupReqDto groupReqDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return dtoFactory.createGroupEditDto(null);
		}
		Group group = null;
		if(groupReqDto.getGroupId() != null) {
			group = groupService.getGroup(userId, groupReqDto.getGroupId());
		}
		return dtoFactory.createGroupEditDto(group);
	}
	
	@RequestMapping(path="/update", method=RequestMethod.POST)
	public Boolean updateGroup(@RequestBody SendGroupFrontDto sendGroupFrontDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		System.out.println("update");
		return groupService.updateGroup(userId, sendGroupFrontDto.getGroupFront());
	}
}
