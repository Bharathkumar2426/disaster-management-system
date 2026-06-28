package com.disaster.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTrainingCenterRequest {

    @NotBlank(message = "Center name is required")
    private String centerName;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Capacity is required")
    private Integer capacity;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotBlank(message = "Coordinator name is required")
    private String coordinatorName;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;
}