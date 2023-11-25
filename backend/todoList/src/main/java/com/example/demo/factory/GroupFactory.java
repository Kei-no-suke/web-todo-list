package com.example.demo.factory;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.Group;
import com.example.demo.model.GroupFront;
import com.example.demo.model.GroupRepository;
import com.example.demo.model.User;
import com.example.demo.model.UserRepository;
import com.example.demo.service.GroupDomainService;

@Component
public class GroupFactory {
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public Group createGroup(Integer userId, GroupFront groupFront) {
		if(groupRepository.existsByGroupName(groupFront.getName(), userId)) {
			return null;
		}
		
		Optional<User> optUser = userRepository.findById(userId);
		User user;
		if(optUser.isPresent()) {
			user = optUser.get();
		}else {
			return null;
		}
		
		Group group = new Group(user, groupFront.getName(), groupFront.getDetail());
		
		return group;
	}
	
	public Group createUpdatedGroup(Integer userId, GroupFront groupFront) {
		Optional<Group> optGroup = groupRepository.findById(groupFront.getGroupId());
		
		if(!optGroup.isPresent()) {
			return null;
		}
		
		if(!GroupDomainService.validateUserId(userId, optGroup.get())) {
			return null;
		}
		
		Optional<Group> optGroupByName = groupRepository.findByGroupName(groupFront.getName(), userId);
		
		if(optGroupByName.isPresent()) {
			if(groupFront.getGroupId() != optGroupByName.get().getGroupId()) {
				return null;
			}
		}
		
		Optional<User> optUser = userRepository.findById(userId);
		User user;
		if(optUser.isPresent()) {
			user = optUser.get();
		}else {
			return null;
		}
		
		Group group = new Group(groupFront.getGroupId(), user, groupFront.getName(), groupFront.getDetail());
		
		return group;
	}
}
