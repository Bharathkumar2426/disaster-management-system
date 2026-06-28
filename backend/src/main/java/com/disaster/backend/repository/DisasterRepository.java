package com.disaster.backend.repository;

import com.disaster.backend.entity.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DisasterRepository extends JpaRepository<Disaster, Long> 
{
    List<Disaster> findAllByOrderByIdDesc(Pageable pageable);

}