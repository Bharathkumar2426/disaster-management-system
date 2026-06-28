package com.disaster.backend.response;

public class RecentDisasterResponse {

    private Long id;
    private String disasterName;
    private String district;
    private String severity;
    private String status;

    public RecentDisasterResponse() {
    }

    public RecentDisasterResponse(Long id,
                                  String disasterName,
                                  String district,
                                  String severity,
                                  String status) {
        this.id = id;
        this.disasterName = disasterName;
        this.district = district;
        this.severity = severity;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getDisasterName() {
        return disasterName;
    }

    public String getDistrict() {
        return district;
    }

    public String getSeverity() {
        return severity;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDisasterName(String disasterName) {
        this.disasterName = disasterName;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}