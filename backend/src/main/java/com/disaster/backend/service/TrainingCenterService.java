package com.disaster.backend.service;

import com.disaster.backend.request.CreateTrainingCenterRequest;
import com.disaster.backend.response.TrainingCenterResponse;

import java.util.List;

public interface TrainingCenterService {

    TrainingCenterResponse createTrainingCenter(CreateTrainingCenterRequest request);

    List<TrainingCenterResponse> getAllTrainingCenters();

    TrainingCenterResponse getTrainingCenterById(Long id);

    TrainingCenterResponse updateTrainingCenter(Long id,
                                                CreateTrainingCenterRequest request);

    void deleteTrainingCenter(Long id);

}