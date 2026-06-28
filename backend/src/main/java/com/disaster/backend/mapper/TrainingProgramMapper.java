package com.disaster.backend.mapper;

import com.disaster.backend.entity.TrainingProgram;
import com.disaster.backend.response.TrainingProgramResponse;

public class TrainingProgramMapper {

    public static TrainingProgramResponse toResponse(TrainingProgram program) {

        return new TrainingProgramResponse(

                program.getId(),
                program.getProgramName(),
                program.getTrainerName(),
                program.getDurationDays(),
                program.getStartDate(),
                program.getEndDate(),
                program.getMaxParticipants(),
                program.getStatus(),
                program.getDescription(),
                program.getTrainingCenter().getId(),
                program.getTrainingCenter().getCenterName()

        );

    }

}