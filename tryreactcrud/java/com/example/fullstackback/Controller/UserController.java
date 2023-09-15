package com.example.fullstackback.Controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.fullstackback.Controller.exception.UserNotFoundException;
import com.example.fullstackback.entity.User;
import com.example.fullstackback.respository.UserRespository;

@RestController
@CrossOrigin("http://localhost:3000/")
@Service
public class UserController {
	
	Map< String, Object> map=new LinkedHashMap<String,Object>();
	
	@Autowired
	private UserRespository userRespository;
	
	@PostMapping("/user")
	User newUser(@RequestBody User newUser) {
		if (newUser.getName().isEmpty() || newUser.getUsername().isEmpty() || newUser.getEmail().isEmpty() || newUser.getUsername().isEmpty() || newUser.getPhone()==null || newUser.getPassword().isEmpty()) {
            throw new IllegalArgumentException("All fields are required");
        }
		
		userRespository.save(newUser);
		Optional<User> user= userRespository.findByEmail(newUser.getEmail());
		return user.get();		
	}
	
	@GetMapping("/users")
	List<User> getAllUsers(){
		return userRespository.findAll();
	}
	
	@GetMapping("/user/{id}")
	User getUserById(@PathVariable Long id) {
		return userRespository.findById(id)
				.orElseThrow(()->new UserNotFoundException(id));
	}
		
	@PutMapping("/user/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return userRespository.findById(id)
				.map(user ->{
					user.setUsername(newUser.getUsername());
					user.setName(newUser.getName());
					user.setEmail(newUser.getEmail());
					user.setPassword(newUser.getPassword());
					user.setPhone(newUser.getPhone());
					return userRespository.save(user);					
				})
				.orElseThrow(()->new UserNotFoundException(id));
	}	
	
	@DeleteMapping("/user/{id}")
	String deleteUser(@PathVariable Long id) {
		if(!userRespository.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userRespository.deleteById(id);
		return "User with id"+id+" has been deleted success";
		}
	
	@GetMapping("/email/{email}/{password}")
	public	ResponseEntity<?> getUserById(@PathVariable String email,@PathVariable String password) {
		System.out.println(email);
//		System.out.println(password);
	
	Optional<User> user=	 userRespository.findByEmail(email);
	System.out.println("this is optional user"+user.get().getPassword()+password);
	if(user.get().getPassword()== password.toString()) 
	{
		System.out.println("this is user manan");
		map.clear();
		map.put("status",200);
		map.put("data",user);
		map.put("token","manan123");
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	else 
	{
		map.clear();
		map.put("status",400);
		map.put("data","Entered wrong email credentials");
		map.put("token",null);
		return new ResponseEntity<>(  map,HttpStatus.BAD_REQUEST);
	}
	}
}