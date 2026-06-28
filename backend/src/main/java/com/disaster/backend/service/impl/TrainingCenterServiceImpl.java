package com.disaster.backend.service.impl;

import com.disaster.backend.entity.TrainingCenter;
import com.disaster.backend.exception.TrainingCenterNotFoundException;
import com.disaster.backend.mapper.TrainingCenterMapper;
import com.disaster.backend.repository.TrainingCenterRepository;
import com.disaster.backend.request.CreateTrainingCenterRequest;
import com.disaster.backend.response.TrainingCenterResponse;
import com.disaster.backend.service.TrainingCenterService;
import org.springframework.stereotype.Service;
import com.disaster.backend.exception.TrainingCenterNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingCenterServiceImpl implements TrainingCenterService {

    private final TrainingCenterRepository trainingCenterRepository;

    public TrainingCenterServiceImpl(TrainingCenterRepository trainingCenterRepository) {
        this.trainingCenterRepository = trainingCenterRepository;
    }

    @Override
    public TrainingCenterResponse createTrainingCenter(CreateTrainingCenterRequest request) {

        TrainingCenter center = TrainingCenterMapper.toEntity(request);

        TrainingCenter savedCenter = trainingCenterRepository.save(center);

        return TrainingCenterMapper.toResponse(savedCenter);
    }

    @Override
    public List<TrainingCenterResponse> getAllTrainingCenters() {

        return trainingCenterRepository.findAll()
                .stream()
                .map(TrainingCenterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingCenterResponse getTrainingCenterById(Long id) {

        TrainingCenter center = trainingCenterRepository.findById(id)
                .orElseThrow(() -> new TrainingCenterNotFoundException("Training Center not found"));

        return TrainingCenterMapper.toResponse(center);
    }

    @Override
    public TrainingCenterResponse updateTrainingCenter(Long id,
                                                       CreateTrainingCenterRequest request) {

        TrainingCenter center = trainingCenterRepository.findById(id)
                .orElseThrow(() -> new TrainingCenterNotFoundException("Training Center not found"));

        center.setCenterName(request.getCenterName());
        center.setDistrict(request.getDistrict());
        center.setAddress(request.getAddress());
        center.setCapacity(request.getCapacity());
        center.setContactNumber(request.getContactNumber());
        center.setCoordinatorName(request.getCoordinatorName());
        center.setStatus(request.getStatus());
        center.setLatitude(request.getLatitude());
        center.setLongitude(request.getLongitude());

        TrainingCenter updatedCenter = trainingCenterRepository.save(center);

        return TrainingCenterMapper.toResponse(updatedCenter);
    }

    @Override
    public void deleteTrainingCenter(Long id) {

        trainingCenterRepository.deleteById(id);

    }
}