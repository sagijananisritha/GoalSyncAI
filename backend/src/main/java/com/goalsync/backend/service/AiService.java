package com.goalsync.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiService {

    public Map<String, Object> generateSmartGoal(String prompt) {
        // Mocking AI response for Hackathon stability
        Map<String, Object> response = new HashMap<>();
        
        response.put("title", "Improve " + prompt + " by 15% using data-driven insights");
        response.put("description", "A SMART goal generated based on the input: '" + prompt + "'. Focus on specific KPIs, assign clear owners, and track progress weekly.");
        response.put("thrustArea", "Growth");
        response.put("target", 15);
        response.put("uom", "%");
        response.put("weightage", 20);
        response.put("milestones", new String[]{"Research Phase (Q1)", "Implementation (Q2)", "Review (Q3)"});
        response.put("riskPrediction", "Low risk if resources are allocated appropriately.");
        
        return response;
    }
}
