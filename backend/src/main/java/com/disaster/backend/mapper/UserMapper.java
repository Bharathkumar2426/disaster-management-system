package com.disaster.backend.mapper;

import com.disaster.backend.entity.User;
import com.disaster.backend.request.CreateUserRequest;
import com.disaster.backend.response.UserResponse;

public class UserMapper {

    public static User toEntity(CreateUserRequest request){

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());

        return user;
    }

    public static UserResponse toResponse(User user){

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole()
        );
    }

}