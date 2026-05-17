package com.goalsync.backend.repository;

import com.goalsync.backend.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<Goal, UUID> {
    List<Goal> findByEmployeeId(UUID employeeId);
    List<Goal> findByManagerId(UUID managerId);
}
