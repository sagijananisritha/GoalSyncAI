package com.goalsync.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("completionRate", 68.5);
        data.put("activeGoals", 142);
        data.put("atRiskGoals", 12);
        
        // Mock chart data for hackathon
        data.put("progressTrend", new int[]{45, 52, 58, 62, 68});
        return ResponseEntity.ok(data);
    }
}
