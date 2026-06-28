package com.disaster.backend.controller;

import com.disaster.backend.request.CreateDisasterRequest;
import com.disaster.backend.response.DisasterResponse;
import com.disaster.backend.service.DisasterService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    private final DisasterService disasterService;

    public DisasterController(DisasterService disasterService) {
        this.disasterService = disasterService;
    }

    @PostMapping
    public DisasterResponse createDisaster(
            @Valid @RequestBody CreateDisasterRequest request) {

        return disasterService.createDisaster(request);
    }

    @GetMapping
    public List<DisasterResponse> getAllDisasters() {

        return disasterService.getAllDisasters();
    }

    @GetMapping("/{id}")
    public DisasterResponse getDisasterById(@PathVariable Long id) {

        return disasterService.getDisasterById(id);
    }

    @PutMapping("/{id}")
    public DisasterResponse updateDisaster(
            @PathVariable Long id,
            @Valid @RequestBody CreateDisasterRequest request) {

        return disasterService.updateDisaster(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteDisaster(@PathVariable Long id) {

        disasterService.deleteDisaster(id);
    }
}