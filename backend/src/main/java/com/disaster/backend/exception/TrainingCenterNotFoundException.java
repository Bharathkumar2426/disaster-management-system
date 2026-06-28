package com.disaster.backend.exception;

public class TrainingCenterNotFoundException extends RuntimeException {

    public TrainingCenterNotFoundException(String message) {
        super(message);
    }
}