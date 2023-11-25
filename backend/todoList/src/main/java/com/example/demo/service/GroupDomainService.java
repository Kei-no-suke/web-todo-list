package com.example.demo.service;

import com.example.demo.model.Group;

public class GroupDomainService {
	public static Boolean validateUserId(Integer userId, Group group) {
		if(userId == group.getUser().getUserId()) {
			return true;
		}else {
			return false;
		}
	}
}
