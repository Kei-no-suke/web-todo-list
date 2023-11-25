package com.example.demo.model;

public enum LoginType {
	PASSWORD(1),
	GOOGLE(2);
	
	private final Integer index;
	
	private LoginType(final Integer index) {
		this.index = index;
	}
	
	public Integer getIndex() {
		return this.index;
	}
	
	public static LoginType getTypeByIndex(final Integer index) {
		LoginType[] loginTypes = LoginType.values();
		for(LoginType loginType: loginTypes) {
			if(loginType.getIndex() == index) {
				return loginType;
			}
		}
		return null;
	}
}
