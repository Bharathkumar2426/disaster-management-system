package com.disaster.backend.service.impl;

import com.disaster.backend.repository.DisasterRepository;
import com.disaster.backend.repository.TrainingCenterRepository;
import com.disaster.backend.repository.TrainingProgramRepository;
import com.disaster.backend.repository.UserRepository;
import com.disaster.backend.response.DashboardResponse;
import com.disaster.backend.service.DashboardService;
import org.springframework.stereotype.Service;
import com.disaster.backend.entity.Disaster;
import com.disaster.backend.response.RecentDisasterResponse;
import org.springframework.data.domain.PageRequest;
import com.disaster.backend.entity.TrainingProgram;
import com.disaster.backend.response.RecentTrainingProgramResponse;
import com.disaster.backend.response.DisasterStatisticsResponse;
import com.disaster.backend.response.ProgramStatusResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final DisasterRepository disasterRepository;
    private final TrainingCenterRepository trainingCenterRepository;
    private final TrainingProgramRepository trainingProgramRepository;

    public DashboardServiceImpl(
            UserRepository userRepository,
            DisasterRepository disasterRepository,
            TrainingCenterRepository trainingCenterRepository,
            TrainingProgramRepository trainingProgramRepository) {

        this.userRepository = userRepository;
        this.disasterRepository = disasterRepository;
        this.trainingCenterRepository = trainingCenterRepository;
        this.trainingProgramRepository = trainingProgramRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        return new DashboardResponse(
                userRepository.count(),
                disasterRepository.count(),
                trainingCenterRepository.count(),
                trainingProgramRepository.count()
        );
    }
    @Override
    public List<RecentDisasterResponse> getRecentDisasters() {

    return disasterRepository
            .findAllByOrderByIdDesc(PageRequest.of(0,5))
            .stream()
            .map(disaster -> new RecentDisasterResponse(

                    disaster.getId(),
                    disaster.getDisasterName(),
                    disaster.getDistrict(),
                    disaster.getSeverity(),
                    disaster.getStatus()

            ))
            .collect(Collectors.toList());

    }
    @Override
    public List<RecentTrainingProgramResponse> getRecentPrograms() {

    return trainingProgramRepository
            .findAllByOrderByIdDesc(PageRequest.of(0, 5))
            .stream()
            .map(program -> new RecentTrainingProgramResponse(

                    program.getId(),
                    program.getProgramName(),
                    program.getTrainerName(),
                    program.getStatus(),
                    program.getTrainingCenter().getCenterName()

            ))
            .collect(Collectors.toList());

    }

    @Override
    public DisasterStatisticsResponse getDisasterStatistics() {

    long high = disasterRepository.findAll()
            .stream()
            .filter(d -> "HIGH".equalsIgnoreCase(d.getSeverity()))
            .count();

    long medium = disasterRepository.findAll()
            .stream()
            .filter(d -> "MEDIUM".equalsIgnoreCase(d.getSeverity()))
            .count();

    long low = disasterRepository.findAll()
            .stream()
            .filter(d -> "LOW".equalsIgnoreCase(d.getSeverity()))
            .count();

    return new DisasterStatisticsResponse(
            high,
            medium,
            low
    );
    }

    @Override
    public ProgramStatusResponse getProgramStatus() {

    long active = trainingProgramRepository.findAll()
            .stream()
            .filter(program -> "ACTIVE".equalsIgnoreCase(program.getStatus()))
            .count();

    long upcoming = trainingProgramRepository.findAll()
            .stream()
            .filter(program -> "UPCOMING".equalsIgnoreCase(program.getStatus()))
            .count();

    long completed = trainingProgramRepository.findAll()
            .stream()
            .filter(program -> "COMPLETED".equalsIgnoreCase(program.getStatus()))
            .count();

    return new ProgramStatusResponse(
            active,
            upcoming,
            completed
    );
    }

}