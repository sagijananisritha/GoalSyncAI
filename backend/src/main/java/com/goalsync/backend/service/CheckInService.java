package com.goalsync.backend.service;

import com.goalsync.backend.entity.CheckIn;
import com.goalsync.backend.entity.Goal;
import com.goalsync.backend.entity.User;
import com.goalsync.backend.repository.CheckInRepository;
import com.goalsync.backend.repository.GoalRepository;
import com.goalsync.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private final CheckInRepository checkInRepository;
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;

    public CheckIn submitCheckIn(UUID goalId, Double actualAchievement, String note, String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail).orElseThrow();
        Goal goal = goalRepository.findById(goalId).orElseThrow();
        
        CheckIn checkIn = CheckIn.builder()
                .goal(goal)
                .actualAchievement(actualAchievement)
                .updateNote(note)
                .build();
                
        CheckIn saved = checkInRepository.save(checkIn);
        activityLogService.logActivity(employee, "CHECK_IN_SUBMITTED", "Submitted check-in for goal: " + goal.getTitle());
        
        return saved;
    }
    
    public List<CheckIn> getCheckInsForGoal(UUID goalId) {
        return checkInRepository.findByGoalId(goalId);
    }
}
