package com.disaster.backend.repository;

import com.disaster.backend.entity.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> 
{
    List<TrainingProgram> findAllByOrderByIdDesc(Pageable pageable);
}