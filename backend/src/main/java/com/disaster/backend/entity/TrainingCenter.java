package com.disaster.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "training_centers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String centerName;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false)
    private String coordinatorName;

    @Column(nullable = false)
    private String status;

    private Double latitude;

    private Double longitude;

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