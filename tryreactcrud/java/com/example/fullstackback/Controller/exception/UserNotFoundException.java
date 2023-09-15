package com.example.fullstackback.Controller.exception;

public class UserNotFoundException extends RuntimeException {

	
	public UserNotFoundException(long id) {
		super("Cound not find the user with id"+id);
	}
}
