package com.goalsync.backend.controller;

import com.goalsync.backend.entity.CheckIn;
import com.goalsync.backend.service.CheckInService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/checkins")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @PostMapping("/{goalId}")
    public ResponseEntity<CheckIn> submitCheckIn(
            @PathVariable UUID goalId, 
            @RequestBody CheckInRequest request, 
            Authentication authentication) {
            
        return ResponseEntity.ok(checkInService.submitCheckIn(
                goalId, request.getActualAchievement(), request.getNote(), authentication.getName()));
    }

    @GetMapping("/goal/{goalId}")
    public ResponseEntity<List<CheckIn>> getCheckIns(@PathVariable UUID goalId) {
        return ResponseEntity.ok(checkInService.getCheckInsForGoal(goalId));
    }
}

@Data
class CheckInRequest {
    private Double actualAchievement;
    private String note;
}
