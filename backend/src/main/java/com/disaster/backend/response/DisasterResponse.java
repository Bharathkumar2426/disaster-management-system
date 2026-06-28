package com.disaster.backend.response;

import com.disaster.backend.enums.Role;

public record DisasterResponse(

        Long id,

        String disasterName,

        String disasterType,

        String district,

        String location,

        String severity,

        String status,

        String description,

        Double latitude,

        Double longitude

) {
}