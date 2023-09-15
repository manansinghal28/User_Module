package com.example.fullstackback.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fullstackback.entity.User;

public interface UserRespository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
	

}
