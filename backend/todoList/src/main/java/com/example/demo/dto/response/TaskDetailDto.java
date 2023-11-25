package com.example.demo.dto.response;

import java.util.List;

import com.example.demo.model.GroupFront;
import com.example.demo.model.TaskFront;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDetailDto {
	TaskFront taskFront;
	List<GroupFront> groupFronts;
}
