package com.disaster.backend.exception;

public class DisasterNotFoundException extends RuntimeException {

    public DisasterNotFoundException(String message) {
        super(message);
    }

}