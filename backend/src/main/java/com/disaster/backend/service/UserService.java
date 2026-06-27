package com.disaster.backend.service;

import com.disaster.backend.response.UserResponse;
import com.disaster.backend.request.CreateUserRequest;

import java.util.List;

public interface UserService {

    UserResponse saveUser(CreateUserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse updateUser(Long id, CreateUserRequest request);

    void deleteUser(Long id);

    UserResponse findByEmail(String email);
}