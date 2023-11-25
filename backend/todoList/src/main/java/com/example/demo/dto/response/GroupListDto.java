package com.example.demo.dto.response;

import java.util.List;

import com.example.demo.model.GroupFront;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupListDto {
	List<GroupFront> groupFronts;
}
