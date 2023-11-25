package com.example.demo.factory;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.demo.model.PasswordUser;
import com.example.demo.model.Session;
import com.example.demo.model.User;

@Component
public class AuthFactory {
	
	public PasswordUser createPUser(User user, String email, String password) {
		if(user.getUserId() == null) {
			return null;
		}
		
		return new PasswordUser(user, email, password);
	}
	
	public Session createSession(User user) {
		String sessionId = UUID.randomUUID().toString();
		LocalDateTime expiredDate = LocalDateTime.now().plusDays(1L);
		
		return new Session(sessionId, user, expiredDate);
	}
}
