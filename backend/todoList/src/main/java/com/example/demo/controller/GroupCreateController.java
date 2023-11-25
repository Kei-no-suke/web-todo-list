package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.SendGroupFrontDto;
import com.example.demo.factory.DtoFactory;
import com.example.demo.service.GroupService;
import com.example.demo.service.SessionService;
import com.example.demo.service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("group-create")
public class GroupCreateController {
	
	@Autowired
	TaskService taskService;
	@Autowired
	GroupService groupService;
	@Autowired
	SessionService sessionService;
	@Autowired
	DtoFactory dtoFactory;	
	
	@RequestMapping(path="/save", method=RequestMethod.POST)
	public Boolean saveGroup(@RequestBody SendGroupFrontDto sendGroupFrontDto, HttpServletRequest request) {
		String sessionId = request.getHeader("X-Auth-Id");
		Integer userId = sessionService.getUserId(sessionId);
		if(userId == null) {
			return false;
		}
		return groupService.saveGroup(userId, sendGroupFrontDto.getGroupFront());
		
//		System.out.println("呼ばれました。");
//		
//		return false;
	}
}
