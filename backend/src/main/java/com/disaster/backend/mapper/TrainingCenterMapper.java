package com.disaster.backend.mapper;

import com.disaster.backend.entity.TrainingCenter;
import com.disaster.backend.request.CreateTrainingCenterRequest;
import com.disaster.backend.response.TrainingCenterResponse;

public class TrainingCenterMapper {

    public static TrainingCenter toEntity(CreateTrainingCenterRequest request) {

        TrainingCenter center = new TrainingCenter();

        center.setCenterName(request.getCenterName());
        center.setDistrict(request.getDistrict());
        center.setAddress(request.getAddress());
        center.setCapacity(request.getCapacity());
        center.setContactNumber(request.getContactNumber());
        center.setCoordinatorName(request.getCoordinatorName());
        center.setStatus(request.getStatus());
        center.setLatitude(request.getLatitude());
        center.setLongitude(request.getLongitude());

        return center;
    }

    public static TrainingCenterResponse toResponse(TrainingCenter center) {

        return new TrainingCenterResponse(

                center.getId(),
                center.getCenterName(),
                center.getDistrict(),
                center.getAddress(),
                center.getCapacity(),
                center.getContactNumber(),
                center.getCoordinatorName(),
                center.getStatus(),
                center.getLatitude(),
                center.getLongitude()

        );
    }
}