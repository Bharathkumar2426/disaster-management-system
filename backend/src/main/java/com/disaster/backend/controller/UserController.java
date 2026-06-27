package com.disaster.backend.controller;

import com.disaster.backend.request.CreateUserRequest;
import com.disaster.backend.response.UserResponse;
import com.disaster.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponse saveUser(@Valid @RequestBody CreateUserRequest request) {
    return userService.saveUser(request);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Long id) {
    return userService.getUserById(id);
    }
    @PutMapping("/{id}")
    public UserResponse updateUser(
        @PathVariable Long id,
        @Valid @RequestBody CreateUserRequest request) {

    return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

    userService.deleteUser(id);

    return "User Deleted Successfully";
    }

    @GetMapping("/search")
    public UserResponse search(@RequestParam String email) {

    return userService.findByEmail(email);
    }
}