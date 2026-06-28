package com.disaster.backend.service.impl;

import com.disaster.backend.entity.Disaster;
import com.disaster.backend.exception.DisasterNotFoundException;
import com.disaster.backend.mapper.DisasterMapper;
import com.disaster.backend.repository.DisasterRepository;
import com.disaster.backend.request.CreateDisasterRequest;
import com.disaster.backend.response.DisasterResponse;
import com.disaster.backend.service.DisasterService;
import org.springframework.stereotype.Service;
import com.disaster.backend.exception.DisasterNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisasterServiceImpl implements DisasterService {

    private final DisasterRepository disasterRepository;

    public DisasterServiceImpl(DisasterRepository disasterRepository) {
        this.disasterRepository = disasterRepository;
    }

    @Override
    public DisasterResponse createDisaster(CreateDisasterRequest request) {

        Disaster disaster = DisasterMapper.toEntity(request);

        Disaster savedDisaster = disasterRepository.save(disaster);

        return DisasterMapper.toResponse(savedDisaster);
    }

    @Override
    public List<DisasterResponse> getAllDisasters() {

        return disasterRepository.findAll()
                .stream()
                .map(DisasterMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DisasterResponse getDisasterById(Long id) {

        Disaster disaster = disasterRepository.findById(id)
                .orElseThrow(() ->
        new DisasterNotFoundException("Disaster not found"));

        return DisasterMapper.toResponse(disaster);
    }

    @Override
    public DisasterResponse updateDisaster(Long id, CreateDisasterRequest request) {

        Disaster disaster = disasterRepository.findById(id)
                .orElseThrow(() ->
        new DisasterNotFoundException("Disaster not found"));

        disaster.setDisasterName(request.getDisasterName());
        disaster.setDisasterType(request.getDisasterType());
        disaster.setDistrict(request.getDistrict());
        disaster.setLocation(request.getLocation());
        disaster.setSeverity(request.getSeverity());
        disaster.setStatus(request.getStatus());
        disaster.setDescription(request.getDescription());
        disaster.setLatitude(request.getLatitude());
        disaster.setLongitude(request.getLongitude());

        Disaster updatedDisaster = disasterRepository.save(disaster);

        return DisasterMapper.toResponse(updatedDisaster);
    }

    @Override
    public void deleteDisaster(Long id) {

        disasterRepository.deleteById(id);

    }
}