package com.disaster.backend.service.impl;

import com.disaster.backend.entity.User;
import com.disaster.backend.exception.UserNotFoundException;
import com.disaster.backend.mapper.UserMapper;
import com.disaster.backend.repository.UserRepository;
import com.disaster.backend.request.CreateUserRequest;
import com.disaster.backend.response.UserResponse;
import com.disaster.backend.service.UserService;
import org.springframework.stereotype.Service;
import com.disaster.backend.exception.UserNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

    @Override
    public UserResponse saveUser(CreateUserRequest request) {

        User user = UserMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User Not Found"));

    return UserMapper.toResponse(user);

    }
    @Override
    public UserResponse updateUser(Long id, CreateUserRequest request) {

    User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User Not Found"));

    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setPhoneNumber(request.getPhoneNumber());
    user.setRole(request.getRole());

    User updatedUser = userRepository.save(user);

    return UserMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

    if (!userRepository.existsById(id)) {
        throw new UserNotFoundException("User Not Found");
    }

    userRepository.deleteById(id);
    }

    @Override
    public UserResponse findByEmail(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User Not Found"));

    return UserMapper.toResponse(user);
    }
}