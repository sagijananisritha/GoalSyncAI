package com.goalsync.backend.controller;

import com.goalsync.backend.entity.Goal;
import com.goalsync.backend.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal, Authentication authentication) {
        return ResponseEntity.ok(goalService.createGoal(goal, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getGoals(Authentication authentication) {
        return ResponseEntity.ok(goalService.getEmployeeGoals(authentication.getName()));
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitGoals(Authentication authentication) {
        goalService.submitGoalsForApproval(authentication.getName());
        return ResponseEntity.ok("Goals submitted for approval successfully");
    }
}
