package com.disaster.backend.controller;

import com.disaster.backend.request.CreateTrainingProgramRequest;
import com.disaster.backend.response.TrainingProgramResponse;
import com.disaster.backend.service.TrainingProgramService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-programs")
public class TrainingProgramController {

    private final TrainingProgramService trainingProgramService;

    public TrainingProgramController(TrainingProgramService trainingProgramService) {
        this.trainingProgramService = trainingProgramService;
    }

    @PostMapping
    public TrainingProgramResponse createTrainingProgram(
            @Valid @RequestBody CreateTrainingProgramRequest request) {

        return trainingProgramService.createTrainingProgram(request);
    }

    @GetMapping
    public List<TrainingProgramResponse> getAllTrainingPrograms() {
        return trainingProgramService.getAllTrainingPrograms();
    }

    @GetMapping("/{id}")
    public TrainingProgramResponse getTrainingProgramById(@PathVariable Long id) {
        return trainingProgramService.getTrainingProgramById(id);
    }

    @PutMapping("/{id}")
    public TrainingProgramResponse updateTrainingProgram(
            @PathVariable Long id,
            @Valid @RequestBody CreateTrainingProgramRequest request) {

        return trainingProgramService.updateTrainingProgram(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainingProgram(@PathVariable Long id) {
        trainingProgramService.deleteTrainingProgram(id);
    }
}