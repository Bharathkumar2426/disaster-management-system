package com.disaster.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTrainingProgramRequest {

    @NotBlank(message = "Program name is required")
    private String programName;

    @NotBlank(message = "Trainer name is required")
    private String trainerName;

    @NotNull(message = "Duration is required")
    private Integer durationDays;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Maximum participants is required")
    private Integer maxParticipants;

    @NotBlank(message = "Status is required")
    private String status;

    private String description;

    @NotNull(message = "Training Center ID is required")
    private Long trainingCenterId;
}