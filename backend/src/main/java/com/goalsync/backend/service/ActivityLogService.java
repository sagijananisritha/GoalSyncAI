package com.goalsync.backend.service;

import com.goalsync.backend.entity.ActivityLog;
import com.goalsync.backend.entity.User;
import com.goalsync.backend.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityLogService {

    private final ActivityLogRepository activityLogRepository;

    public void logActivity(User user, String action, String description) {
        ActivityLog log = ActivityLog.builder()
                .user(user)
                .action(action)
                .description(description)
                .build();
        activityLogRepository.save(log);
    }
}
