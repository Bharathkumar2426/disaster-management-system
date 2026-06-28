package com.disaster.backend.response;

public class ProgramStatusResponse {

    private long active;
    private long upcoming;
    private long completed;

    public ProgramStatusResponse() {
    }

    public ProgramStatusResponse(long active,
                                 long upcoming,
                                 long completed) {
        this.active = active;
        this.upcoming = upcoming;
        this.completed = completed;
    }

    public long getActive() {
        return active;
    }

    public void setActive(long active) {
        this.active = active;
    }

    public long getUpcoming() {
        return upcoming;
    }

    public void setUpcoming(long upcoming) {
        this.upcoming = upcoming;
    }

    public long getCompleted() {
        return completed;
    }

    public void setCompleted(long completed) {
        this.completed = completed;
    }
}