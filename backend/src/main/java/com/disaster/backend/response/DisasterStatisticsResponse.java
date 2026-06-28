package com.disaster.backend.response;

public class DisasterStatisticsResponse {

    private long highSeverity;
    private long mediumSeverity;
    private long lowSeverity;

    public DisasterStatisticsResponse() {
    }

    public DisasterStatisticsResponse(long highSeverity,
                                      long mediumSeverity,
                                      long lowSeverity) {
        this.highSeverity = highSeverity;
        this.mediumSeverity = mediumSeverity;
        this.lowSeverity = lowSeverity;
    }

    public long getHighSeverity() {
        return highSeverity;
    }

    public void setHighSeverity(long highSeverity) {
        this.highSeverity = highSeverity;
    }

    public long getMediumSeverity() {
        return mediumSeverity;
    }

    public void setMediumSeverity(long mediumSeverity) {
        this.mediumSeverity = mediumSeverity;
    }

    public long getLowSeverity() {
        return lowSeverity;
    }

    public void setLowSeverity(long lowSeverity) {
        this.lowSeverity = lowSeverity;
    }
}