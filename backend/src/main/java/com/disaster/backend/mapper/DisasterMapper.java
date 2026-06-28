package com.disaster.backend.mapper;

import com.disaster.backend.entity.Disaster;
import com.disaster.backend.request.CreateDisasterRequest;
import com.disaster.backend.response.DisasterResponse;

public class DisasterMapper {

    public static Disaster toEntity(CreateDisasterRequest request) {

        Disaster disaster = new Disaster();

        disaster.setDisasterName(request.getDisasterName());
        disaster.setDisasterType(request.getDisasterType());
        disaster.setDistrict(request.getDistrict());
        disaster.setLocation(request.getLocation());
        disaster.setSeverity(request.getSeverity());
        disaster.setStatus(request.getStatus());
        disaster.setDescription(request.getDescription());
        disaster.setLatitude(request.getLatitude());
        disaster.setLongitude(request.getLongitude());

        return disaster;
    }

    public static DisasterResponse toResponse(Disaster disaster) {

        return new DisasterResponse(
                disaster.getId(),
                disaster.getDisasterName(),
                disaster.getDisasterType(),
                disaster.getDistrict(),
                disaster.getLocation(),
                disaster.getSeverity(),
                disaster.getStatus(),
                disaster.getDescription(),
                disaster.getLatitude(),
                disaster.getLongitude()
        );
    }
}