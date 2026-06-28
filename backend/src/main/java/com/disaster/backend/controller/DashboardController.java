package com.disaster.backend.controller;

import com.disaster.backend.response.DashboardResponse;
import com.disaster.backend.response.RecentDisasterResponse;
import com.disaster.backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.disaster.backend.response.RecentDisasterResponse;
import com.disaster.backend.response.RecentTrainingProgramResponse;
import com.disaster.backend.response.DisasterStatisticsResponse;
import com.disaster.backend.response.ProgramStatusResponse;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboard();
    }

    @GetMapping("/recent-disasters")
    public List<RecentDisasterResponse> getRecentDisasters(){

    return dashboardService.getRecentDisasters();

    }
    @GetMapping("/recent-programs")
    public List<RecentTrainingProgramResponse> getRecentPrograms() {

    return dashboardService.getRecentPrograms();

    }

    @GetMapping("/statistics")
    public DisasterStatisticsResponse getDisasterStatistics() {

    return dashboardService.getDisasterStatistics();

    }

    @GetMapping("/program-status")
    public ProgramStatusResponse getProgramStatus() {

    return dashboardService.getProgramStatus();

    }
}