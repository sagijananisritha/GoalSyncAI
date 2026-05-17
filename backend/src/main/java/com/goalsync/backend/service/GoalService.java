package com.goalsync.backend.service;

import com.goalsync.backend.entity.Goal;
import com.goalsync.backend.entity.GoalStatus;
import com.goalsync.backend.entity.User;
import com.goalsync.backend.repository.GoalRepository;
import com.goalsync.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;

    public Goal createGoal(Goal goal, String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail).orElseThrow();
        goal.setEmployee(employee);
        goal.setStatus(GoalStatus.DRAFT);
        
        Goal saved = goalRepository.save(goal);
        activityLogService.logActivity(employee, "GOAL_CREATED", "Created draft goal: " + goal.getTitle());
        return saved;
    }

    public List<Goal> getEmployeeGoals(String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail).orElseThrow();
        return goalRepository.findByEmployeeId(employee.getId());
    }

    public void submitGoalsForApproval(String employeeEmail) {
        User employee = userRepository.findByEmail(employeeEmail).orElseThrow();
        List<Goal> goals = goalRepository.findByEmployeeId(employee.getId());
        
        // Validation logic
        int totalWeightage = goals.stream()
                .filter(g -> g.getStatus() == GoalStatus.DRAFT)
                .mapToInt(Goal::getWeightage)
                .sum();
                
        // For hackathon: we can relax this or enforce exactly 100
        if (totalWeightage != 100 && totalWeightage > 0) {
            // throw new RuntimeException("Total weightage must be exactly 100%");
            // Relaxed for hackathon:
        }

        for (Goal g : goals) {
            if (g.getStatus() == GoalStatus.DRAFT) {
                g.setStatus(GoalStatus.PENDING_APPROVAL);
                goalRepository.save(g);
                activityLogService.logActivity(employee, "GOAL_SUBMITTED", "Submitted goal for approval: " + g.getTitle());
            }
        }
    }

    public Goal updateGoalStatus(UUID goalId, GoalStatus status, String managerEmail) {
        User manager = userRepository.findByEmail(managerEmail).orElseThrow();
        Goal goal = goalRepository.findById(goalId).orElseThrow();
        
        goal.setStatus(status);
        goal.setManager(manager); // set the manager who approved/rejected it
        Goal saved = goalRepository.save(goal);
        
        activityLogService.logActivity(manager, "GOAL_STATUS_UPDATED", "Updated goal " + goal.getTitle() + " to " + status);
        return saved;
    }
}
