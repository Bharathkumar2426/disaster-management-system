package com.disaster.backend.response;

public class RecentTrainingProgramResponse {

    private Long id;
    private String programName;
    private String trainerName;
    private String status;
    private String trainingCenterName;

    public RecentTrainingProgramResponse() {
    }

    public RecentTrainingProgramResponse(Long id,
                                         String programName,
                                         String trainerName,
                                         String status,
                                         String trainingCenterName) {
        this.id = id;
        this.programName = programName;
        this.trainerName = trainerName;
        this.status = status;
        this.trainingCenterName = trainingCenterName;
    }

    public Long getId() {
        return id;
    }

    public String getProgramName() {
        return programName;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public String getStatus() {
        return status;
    }

    public String getTrainingCenterName() {
        return trainingCenterName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTrainingCenterName(String trainingCenterName) {
        this.trainingCenterName = trainingCenterName;
    }
}