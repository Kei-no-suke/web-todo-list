package com.example.demo.factory;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.dto.response.GroupDetailDto;
import com.example.demo.dto.response.GroupEditDto;
import com.example.demo.dto.response.GroupListDto;
import com.example.demo.dto.response.TaskCreateDto;
import com.example.demo.dto.response.TaskDetailDto;
import com.example.demo.dto.response.TaskEditDto;
import com.example.demo.dto.response.TaskListDto;
import com.example.demo.model.Group;
import com.example.demo.model.GroupFront;
import com.example.demo.model.Task;
import com.example.demo.model.TaskFront;
import com.example.demo.model.TaskStatus;

@Component
public class DtoFactory {
	public GroupDetailDto createGroupDetailDto(Group group, List<Task> tasks) {
		GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
				group.getDetail());
		List<TaskFront> taskFronts = null;
		if(tasks != null) {
			taskFronts = new ArrayList<>();
			for(Task task: tasks) {
				String deadline = null;
				if(task.getDeadline() != null) {
					deadline = task.getDeadline().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
				}
				
				String status = TaskStatus.getStatusByIndex(task.getStatus()).getText();
				
				String groupName = null;
				
				if(task.getGroup() != null) {
					groupName = task.getGroup().getName();
				}
				
				TaskFront taskFront = new TaskFront(task.getTaskId(), task.getUser().getUserId(),
						groupName, task.getName(), task.getDetail(), deadline, status,
						task.getDocUrl());
				
				taskFronts.add(taskFront);
			}
		}
		
		GroupDetailDto groupDetailDto = new GroupDetailDto(groupFront, taskFronts);
		
		return groupDetailDto;
	}
	
	public GroupEditDto createGroupEditDto(Group group) {
		GroupFront groupFront = null;
		if(group != null) {
			groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
					group.getDetail());
		}
		
		GroupEditDto groupEditDto = new GroupEditDto(groupFront);
		return groupEditDto;
	}
	
	public GroupListDto createGroupListDto(List<Group> groups) {
		List<GroupFront> groupFronts = null;
		if(groups != null) {
			groupFronts = new ArrayList<>();
			
			for(Group group: groups) {
				GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
						group.getDetail());
				
				groupFronts.add(groupFront);
			}
		}
		GroupListDto groupListDto = new GroupListDto(groupFronts);
		return groupListDto;
	}
	
	public TaskCreateDto createTaskCreateDto(List<Group> groups) {
		List<GroupFront> groupFronts = null;
		if(groups != null) {
			groupFronts = new ArrayList<>();
			
			for(Group group: groups) {
				GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
						group.getDetail());
				
				groupFronts.add(groupFront);
			}
		}
		TaskCreateDto taskCreateDto = new TaskCreateDto(groupFronts);
		return taskCreateDto;
	}
	
	public TaskDetailDto createTaskDetailDto(Task task, List<Group> groups) {
		
		String deadline = null;
		if(task.getDeadline() != null) {
			deadline = task.getDeadline().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		
		String status = TaskStatus.getStatusByIndex(task.getStatus()).getText();
		
		String groupName = null;
		
		if(task.getGroup() != null) {
			groupName = task.getGroup().getName();
		}
		
		TaskFront taskFront = new TaskFront(task.getTaskId(), task.getUser().getUserId(),
				groupName, task.getName(), task.getDetail(), deadline, status,
				task.getDocUrl());
		
		List<GroupFront> groupFronts = null;
		if(groups != null) {
			groupFronts = new ArrayList<>();
			
			for(Group group: groups) {
				GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
						group.getDetail());
				
				groupFronts.add(groupFront);
			}
		}
		TaskDetailDto taskDetailDto = new TaskDetailDto(taskFront, groupFronts);
		return taskDetailDto;
	}
	
	public TaskEditDto createTaskEditDto(Task task, List<Group> groups) {
		
		String deadline = null;
		if(task.getDeadline() != null) {
			deadline = task.getDeadline().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		}
		
		String status = TaskStatus.getStatusByIndex(task.getStatus()).getText();
		
		String groupName = null;
		
		if(task.getGroup() != null) {
			groupName = task.getGroup().getName();
		}
		
		TaskFront taskFront = new TaskFront(task.getTaskId(), task.getUser().getUserId(),
				groupName, task.getName(), task.getDetail(), deadline, status,
				task.getDocUrl());
		
		List<GroupFront> groupFronts = null;
		if(groups != null) {
			groupFronts = new ArrayList<>();
			
			for(Group group: groups) {
				GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
						group.getDetail());
				
				groupFronts.add(groupFront);
			}
		}
		TaskEditDto taskEditDto = new TaskEditDto(taskFront, groupFronts);
		return taskEditDto;
	}
	
	public TaskListDto createTaskListDto(List<Task> tasks, List<Group> groups) {
		
		List<TaskFront> taskFronts = null;
		if(tasks != null) {
			taskFronts = new ArrayList<>();
			for(Task task: tasks) {
				String deadline = null;
				if(task.getDeadline() != null) {
					deadline = task.getDeadline().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
				}
				
				String groupName = null;
				
				if(task.getGroup() != null) {
					groupName = task.getGroup().getName();
				}
				
				String status = TaskStatus.getStatusByIndex(task.getStatus()).getText();
				TaskFront taskFront = new TaskFront(task.getTaskId(), task.getUser().getUserId(),
						groupName, task.getName(), task.getDetail(), deadline, status,
						task.getDocUrl());
				
				taskFronts.add(taskFront);
			}
		}
		
		List<GroupFront> groupFronts = null;
		if(groups != null) {
			groupFronts = new ArrayList<>();
			
			for(Group group: groups) {
				GroupFront groupFront = new GroupFront(group.getGroupId(), group.getUser().getUserId(), group.getName(),
						group.getDetail());
				
				groupFronts.add(groupFront);
			}
		}
		TaskListDto taskListDto = new TaskListDto(taskFronts, groupFronts);
		return taskListDto;
	}
}
