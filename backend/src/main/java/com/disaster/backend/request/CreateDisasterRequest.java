package com.disaster.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDisasterRequest {

    @NotBlank(message = "Disaster name is required")
    private String disasterName;

    @NotBlank(message = "Disaster type is required")
    private String disasterType;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Severity is required")
    private String severity;

    @NotBlank(message = "Status is required")
    private String status;

    private String description;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;
}