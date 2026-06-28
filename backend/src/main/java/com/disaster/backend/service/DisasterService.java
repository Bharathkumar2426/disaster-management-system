package com.disaster.backend.service;

import com.disaster.backend.request.CreateDisasterRequest;
import com.disaster.backend.response.DisasterResponse;

import java.util.List;

public interface DisasterService {

    DisasterResponse createDisaster(CreateDisasterRequest request);

    List<DisasterResponse> getAllDisasters();

    DisasterResponse getDisasterById(Long id);

    DisasterResponse updateDisaster(Long id, CreateDisasterRequest request);

    void deleteDisaster(Long id);
}