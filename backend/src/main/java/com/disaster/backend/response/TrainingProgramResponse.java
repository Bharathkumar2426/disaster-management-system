package com.disaster.backend.response;

import java.time.LocalDate;

public record TrainingProgramResponse(

        Long id,

        String programName,

        String trainerName,

        Integer durationDays,

        LocalDate startDate,

        LocalDate endDate,

        Integer maxParticipants,

        String status,

        String description,

        Long trainingCenterId,

        String trainingCenterName

) {
}