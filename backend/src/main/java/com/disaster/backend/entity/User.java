package com.disaster.backend.entity;

import com.disaster.backend.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
public void onCreate() {

    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();

}

@PreUpdate
public void onUpdate() {

    updatedAt = LocalDateTime.now();

}

}