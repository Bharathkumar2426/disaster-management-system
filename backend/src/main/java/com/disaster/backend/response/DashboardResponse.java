package com.disaster.backend.response;

public class DashboardResponse {

    private long totalUsers;
    private long totalDisasters;
    private long totalTrainingCenters;
    private long totalTrainingPrograms;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalUsers,
                             long totalDisasters,
                             long totalTrainingCenters,
                             long totalTrainingPrograms) {
        this.totalUsers = totalUsers;
        this.totalDisasters = totalDisasters;
        this.totalTrainingCenters = totalTrainingCenters;
        this.totalTrainingPrograms = totalTrainingPrograms;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalDisasters() {
        return totalDisasters;
    }

    public void setTotalDisasters(long totalDisasters) {
        this.totalDisasters = totalDisasters;
    }

    public long getTotalTrainingCenters() {
        return totalTrainingCenters;
    }

    public void setTotalTrainingCenters(long totalTrainingCenters) {
        this.totalTrainingCenters = totalTrainingCenters;
    }

    public long getTotalTrainingPrograms() {
        return totalTrainingPrograms;
    }

    public void setTotalTrainingPrograms(long totalTrainingPrograms) {
        this.totalTrainingPrograms = totalTrainingPrograms;
    }
}