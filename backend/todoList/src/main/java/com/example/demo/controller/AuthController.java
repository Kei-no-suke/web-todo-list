package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.SendPUserDto;
import com.example.demo.model.Session;
import com.example.demo.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("auth")
public class AuthController {
	
	@Autowired
	AuthService authService;
	
//	@RequestMapping(path="/", method=RequestMethod.GET)
//	public Boolean authVoid() {
//		System.out.println("zz");
//		return true;
//	}
	
	@RequestMapping(path="/", method=RequestMethod.GET)
	public Boolean getStartFlag(){
		return true;
	}
	
	@RequestMapping(path="/session", method=RequestMethod.GET)
	public Boolean checkSession(HttpServletRequest request){
		String sessionId = request.getHeader("X-Auth-Id");
		return authService.checkSession(sessionId);
	}
	
	@RequestMapping(path="/p-sign-up", method=RequestMethod.POST)
	public ResponseEntity<Boolean> setPUser(
		@RequestBody SendPUserDto sendPUserDto,
		HttpServletResponse response
	) throws IOException {	
		Session session = authService.setPUser(sendPUserDto.getEmail(), sendPUserDto.getPassword());
		if(session == null) {
			return ResponseEntity.ok().body(false);
		}
		
		return ResponseEntity.ok().header("X-Auth-Id", session.getSessionId()).body(true);
	}
	
	@RequestMapping(path="/p-login", method=RequestMethod.POST)
	public ResponseEntity<Boolean> pUserLogin(@RequestBody SendPUserDto sendPUserDto, HttpServletResponse response) throws IOException {
		Session session = authService.pUserLogin(sendPUserDto.getEmail(), sendPUserDto.getPassword());
		if(session == null) {
			return ResponseEntity.ok().body(false);
		}
		return ResponseEntity.ok().header("X-Auth-Id", session.getSessionId()).body(true);
	}
	
	@RequestMapping(path="/logout", method=RequestMethod.POST)
	public Boolean logout(
		HttpServletRequest request,
		HttpServletResponse response
	) {	
		String sessionId = request.getHeader("X-Auth-Id");
		return authService.logout(sessionId);
	}
}
