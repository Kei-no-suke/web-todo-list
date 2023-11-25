package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Session;
import com.example.demo.model.SessionRepository;

@Service
public class SessionService {
	@Autowired
	SessionRepository sessionRepository;
	
	public Integer getUserId(String sessionId) {
		Optional<Session> optSession = sessionRepository.findById(sessionId);
		
		if(optSession.isPresent()) {
			return optSession.get().getUser().getUserId();
		}else {
			return null;
		}
	}
}
