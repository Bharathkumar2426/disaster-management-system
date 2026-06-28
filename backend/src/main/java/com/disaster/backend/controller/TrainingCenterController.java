package com.disaster.backend.controller;

import com.disaster.backend.request.CreateTrainingCenterRequest;
import com.disaster.backend.response.TrainingCenterResponse;
import com.disaster.backend.service.TrainingCenterService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-centers")
public class TrainingCenterController {

    private final TrainingCenterService trainingCenterService;

    public TrainingCenterController(TrainingCenterService trainingCenterService) {
        this.trainingCenterService = trainingCenterService;
    }

    @PostMapping
    public TrainingCenterResponse createTrainingCenter(
            @Valid @RequestBody CreateTrainingCenterRequest request) {

        return trainingCenterService.createTrainingCenter(request);
    }

    @GetMapping
    public List<TrainingCenterResponse> getAllTrainingCenters() {

        return trainingCenterService.getAllTrainingCenters();
    }

    @GetMapping("/{id}")
    public TrainingCenterResponse getTrainingCenterById(
            @PathVariable Long id) {

        return trainingCenterService.getTrainingCenterById(id);
    }

    @PutMapping("/{id}")
    public TrainingCenterResponse updateTrainingCenter(
            @PathVariable Long id,
            @Valid @RequestBody CreateTrainingCenterRequest request) {

        return trainingCenterService.updateTrainingCenter(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteTrainingCenter(
            @PathVariable Long id) {

        trainingCenterService.deleteTrainingCenter(id);
    }
}