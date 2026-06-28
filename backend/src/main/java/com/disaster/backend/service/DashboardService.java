package com.disaster.backend.service;

import com.disaster.backend.response.DashboardResponse;
import java.util.List;
import com.disaster.backend.response.RecentDisasterResponse;
import com.disaster.backend.response.RecentTrainingProgramResponse;
import com.disaster.backend.response.DisasterStatisticsResponse;
import com.disaster.backend.response.ProgramStatusResponse;

public interface DashboardService
{

    DashboardResponse getDashboard();
    List<RecentDisasterResponse> getRecentDisasters();
    List<RecentTrainingProgramResponse> getRecentPrograms();
    DisasterStatisticsResponse getDisasterStatistics();
    ProgramStatusResponse getProgramStatus();
}