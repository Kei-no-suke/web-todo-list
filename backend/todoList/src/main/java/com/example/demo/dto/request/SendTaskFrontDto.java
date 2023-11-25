package com.example.demo.dto.request;

import com.example.demo.model.TaskFront;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendTaskFrontDto {
	TaskFront taskFront;
}
