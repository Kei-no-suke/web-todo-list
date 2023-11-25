package com.example.demo.service;

import com.example.demo.model.PasswordUser;

public class AuthDomainService {
	
	public static Boolean validatePassword(String password, PasswordUser pUser) {
		return password.equals(pUser.getPassword());
	}
	
	public static Boolean validateNewPassword(String password) {
		return password.length() >= 8 && password.length() <= 25;
	}
}
