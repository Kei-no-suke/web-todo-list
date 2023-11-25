package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.service.AuthService;

import jakarta.annotation.PostConstruct;

@Component
public class InitComponent {
	
	@Autowired
	AuthService authService;
	
	@PostConstruct
	public void init() {
		authService.deleteExpiredSession();
	}
}
