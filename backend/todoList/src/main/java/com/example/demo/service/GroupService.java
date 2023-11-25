package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.factory.GroupFactory;
import com.example.demo.model.Group;
import com.example.demo.model.GroupFront;
import com.example.demo.model.GroupRepository;

@Service
public class GroupService {
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	GroupFactory groupFactory;
	
	// create
	public Boolean saveGroup(Integer userId, GroupFront groupFront) {
		Group group = groupFactory.createGroup(userId, groupFront);
		if(group != null) {
			groupRepository.save(group);
			return true;
		}else {
			return false;
		}
	}
	
	// read
	public Group getGroup(Integer userId, Integer groupId) {
		Optional<Group> optGroup = groupRepository.findById(groupId);
		if(!optGroup.isPresent()) {
			return null;
		}
		
		if(!GroupDomainService.validateUserId(userId, optGroup.get())) {
			return null;
		}else {
			return optGroup.get();
		}
	}
	
	public List<Group> getGroupList(Integer userId){
		Optional<List<Group>> optGroups = groupRepository.findGroupsByUserId(userId);
		
		if(optGroups.isPresent()) {
			return optGroups.get();
		}else {
			return null;
		}
	}
	
	// update
	public Boolean updateGroup(Integer userId, GroupFront groupFront) {
		Group group = groupFactory.createUpdatedGroup(userId, groupFront);
		
		if(group != null) {
			groupRepository.save(group);
			return true;
		}else {
			return false;
		}
	}
	
	// delete
	public Boolean deleteGroup(Integer userId, Integer groupId) {
		Optional<Group> optGroup = groupRepository.findById(groupId);
		
		if(!optGroup.isPresent()) {
			return false;
		}
		
		if(!GroupDomainService.validateUserId(userId, optGroup.get())) {
			return false;
		}
		
		groupRepository.deleteById(groupId);
		return true;
	}
}
