package com.disaster.backend.service.impl;

import com.disaster.backend.entity.TrainingCenter;
import com.disaster.backend.entity.TrainingProgram;
import com.disaster.backend.mapper.TrainingProgramMapper;
import com.disaster.backend.repository.TrainingCenterRepository;
import com.disaster.backend.repository.TrainingProgramRepository;
import com.disaster.backend.request.CreateTrainingProgramRequest;
import com.disaster.backend.response.TrainingProgramResponse;
import com.disaster.backend.service.TrainingProgramService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingProgramServiceImpl implements TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;
    private final TrainingCenterRepository trainingCenterRepository;

    public TrainingProgramServiceImpl(
            TrainingProgramRepository trainingProgramRepository,
            TrainingCenterRepository trainingCenterRepository) {

        this.trainingProgramRepository = trainingProgramRepository;
        this.trainingCenterRepository = trainingCenterRepository;
    }

    @Override
    public TrainingProgramResponse createTrainingProgram(CreateTrainingProgramRequest request) {

        TrainingCenter trainingCenter = trainingCenterRepository.findById(request.getTrainingCenterId())
                .orElseThrow(() -> new RuntimeException("Training Center not found"));

        TrainingProgram program = TrainingProgram.builder()
                .programName(request.getProgramName())
                .trainerName(request.getTrainerName())
                .durationDays(request.getDurationDays())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .maxParticipants(request.getMaxParticipants())
                .status(request.getStatus())
                .description(request.getDescription())
                .trainingCenter(trainingCenter)
                .build();

        TrainingProgram savedProgram = trainingProgramRepository.save(program);

        return TrainingProgramMapper.toResponse(savedProgram);
    }

    @Override
    public List<TrainingProgramResponse> getAllTrainingPrograms() {

        return trainingProgramRepository.findAll()
                .stream()
                .map(TrainingProgramMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TrainingProgramResponse getTrainingProgramById(Long id) {

        TrainingProgram program = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training Program not found"));

        return TrainingProgramMapper.toResponse(program);
    }

    @Override
    public TrainingProgramResponse updateTrainingProgram(Long id,
                                                         CreateTrainingProgramRequest request) {

        TrainingProgram program = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training Program not found"));

        TrainingCenter trainingCenter = trainingCenterRepository.findById(request.getTrainingCenterId())
                .orElseThrow(() -> new RuntimeException("Training Center not found"));

        program.setProgramName(request.getProgramName());
        program.setTrainerName(request.getTrainerName());
        program.setDurationDays(request.getDurationDays());
        program.setStartDate(request.getStartDate());
        program.setEndDate(request.getEndDate());
        program.setMaxParticipants(request.getMaxParticipants());
        program.setStatus(request.getStatus());
        program.setDescription(request.getDescription());
        program.setTrainingCenter(trainingCenter);

        TrainingProgram updatedProgram = trainingProgramRepository.save(program);

        return TrainingProgramMapper.toResponse(updatedProgram);
    }

    @Override
    public void deleteTrainingProgram(Long id) {

        trainingProgramRepository.deleteById(id);

    }
}