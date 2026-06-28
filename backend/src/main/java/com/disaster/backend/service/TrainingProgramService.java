package com.disaster.backend.service;

import com.disaster.backend.request.CreateTrainingProgramRequest;
import com.disaster.backend.response.TrainingProgramResponse;

import java.util.List;

public interface TrainingProgramService {

    TrainingProgramResponse createTrainingProgram(CreateTrainingProgramRequest request);

    List<TrainingProgramResponse> getAllTrainingPrograms();

    TrainingProgramResponse getTrainingProgramById(Long id);

    TrainingProgramResponse updateTrainingProgram(
            Long id,
            CreateTrainingProgramRequest request);

    void deleteTrainingProgram(Long id);

}