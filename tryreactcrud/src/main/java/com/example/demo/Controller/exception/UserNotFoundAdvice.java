package com.example.demo.Controller.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserNotFoundAdvice {

	
	@ResponseBody
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus()
	public Map<String,String> exceptionHandler(UserNotFoundException exception){

	 	Map<String,String> errorMap=new HashMap<>();

	 	errorMap.put("Error", exception.getMessage());
	return errorMap;
	}
}
