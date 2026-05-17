package com.goalsync.backend.config;

import com.goalsync.backend.entity.Goal;
import com.goalsync.backend.entity.GoalStatus;
import com.goalsync.backend.entity.Role;
import com.goalsync.backend.entity.User;
import com.goalsync.backend.repository.GoalRepository;
import com.goalsync.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GoalRepository goalRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            
            // 1. Create Manager
            User manager = User.builder()
                    .name("Sarah Connor")
                    .email("manager@goalsync.ai")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.MANAGER)
                    .build();
            userRepository.save(manager);

            // 2. Create Employee
            User employee = User.builder()
                    .name("John Doe")
                    .email("employee@goalsync.ai")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.EMPLOYEE)
                    .manager(manager)
                    .build();
            userRepository.save(employee);

            // 3. Create Goals
            Goal goal1 = Goal.builder()
                    .title("Increase Q3 Enterprise Sales")
                    .description("Focus on top 50 accounts to drive a 15% revenue increase.")
                    .thrustArea("Revenue")
                    .target(15.0)
                    .uom("%")
                    .weightage(40)
                    .status(GoalStatus.APPROVED)
                    .employee(employee)
                    .manager(manager)
                    .build();
            
            Goal goal2 = Goal.builder()
                    .title("Reduce Customer Churn")
                    .description("Implement proactive feedback loop to keep churn under 3%.")
                    .thrustArea("Customer Success")
                    .target(3.0)
                    .uom("%")
                    .weightage(30)
                    .status(GoalStatus.PENDING_APPROVAL)
                    .employee(employee)
                    .manager(manager)
                    .build();
            
            Goal goal3 = Goal.builder()
                    .title("Launch New AI Feature")
                    .description("Ship the Smart Goal Generator by end of Q3.")
                    .thrustArea("Product")
                    .target(100.0)
                    .uom("%")
                    .weightage(30)
                    .status(GoalStatus.DRAFT)
                    .employee(employee)
                    .manager(manager)
                    .build();

            goalRepository.save(goal1);
            goalRepository.save(goal2);
            goalRepository.save(goal3);

            System.out.println("Hackathon Demo Data Seeded Successfully!");
            System.out.println("Login with: employee@goalsync.ai / password123");
        }
    }
}
