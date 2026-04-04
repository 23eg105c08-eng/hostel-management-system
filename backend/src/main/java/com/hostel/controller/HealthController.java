package com.hostel.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String index() {
        return "{\"status\": \"Backend is running\", \"version\": \"1.0\"}";
    }

    @GetMapping("/health")
    public String health() {
        return "{\"status\": \"OK\"}";
    }
}
