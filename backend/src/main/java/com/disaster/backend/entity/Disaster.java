package com.disaster.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "disasters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Disaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String disasterName;

    @Column(nullable = false)
    private String disasterType;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String severity;

    @Column(nullable = false)
    private String status;

    private String description;

    private Double latitude;

    private Double longitude;

    private LocalDateTime reportedAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        reportedAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}