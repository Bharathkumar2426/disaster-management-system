package com.disaster.backend.response;

public record TrainingCenterResponse(

        Long id,

        String centerName,

        String district,

        String address,

        Integer capacity,

        String contactNumber,

        String coordinatorName,

        String status,

        Double latitude,

        Double longitude

) {
}