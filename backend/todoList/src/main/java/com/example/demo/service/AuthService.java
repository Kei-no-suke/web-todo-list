package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.factory.AuthFactory;
import com.example.demo.model.LoginType;
import com.example.demo.model.PasswordUser;
import com.example.demo.model.PasswordUserRepository;
import com.example.demo.model.Session;
import com.example.demo.model.SessionRepository;
import com.example.demo.model.User;
import com.example.demo.model.UserRepository;

@Service
public class AuthService {
	
	@Autowired
	PasswordUserRepository passwordUserRepository;
	@Autowired
	AuthFactory authFactory;
	@Autowired
	UserRepository userRepository;
	@Autowired
	SessionRepository sessionRepository;
	
	public Session setPUser(String email, String password) {
		
		if(passwordUserRepository.existsByEmail(email) || !AuthDomainService.validateNewPassword(password)) {
			return null;
		}
		
		User user = new User(LoginType.PASSWORD.getIndex());
		
		userRepository.save(user);
		
		PasswordUser pUser = authFactory.createPUser(user, email, password);
		if(pUser == null) {
			return null;
		}
		passwordUserRepository.save(pUser);
		
		Session session = authFactory.createSession(user);
		
		Session oldSession = sessionRepository.findByUserId(user.getUserId());
		
		if(oldSession != null) {
			sessionRepository.deleteById(oldSession.getSessionId());
		}
		
		sessionRepository.save(session);
		
		return session;
	}
	
	public Session pUserLogin(String email, String password) {
		Optional<PasswordUser> optPUser = passwordUserRepository.findByEmail(email);
		if(!optPUser.isPresent()) {
			return null;
		}
		
		if(!AuthDomainService.validatePassword(password, optPUser.get())) {
			return null;
		}
		System.out.println("validate-password");
		Session session = authFactory.createSession(optPUser.get().getUser());
		
		Session oldSession = sessionRepository.findByUserId(optPUser.get().getUser().getUserId());
		
		if(oldSession != null) {
			sessionRepository.deleteById(oldSession.getSessionId());
		}
		
		sessionRepository.save(session);
		
		return session;
	}
	
	public Boolean logout(String sessionId) {
		if(sessionRepository.existsById(sessionId)) {
			sessionRepository.deleteById(sessionId);
			return true;
		}
		return false;
	}
	
	public void deleteExpiredSession() {
		List<Session> sessions = sessionRepository.findAll();
		if(sessions.isEmpty()) {
			return;
		}
		List<Session> deleteSessions = new ArrayList<>();
		for(Session session: sessions) {
			if(session.getExpiredDate().isBefore(LocalDateTime.now())) {
				deleteSessions.add(session);
			}
		}
		sessionRepository.deleteAll(deleteSessions);
	}
	
	public Boolean checkSession(String sessionId) {
		Optional<Session> session = sessionRepository.findById(sessionId);
		return session.isPresent();
	}
}
