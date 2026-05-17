package com.goalsync.backend.controller;

import com.goalsync.backend.service.AiService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateGoal(@RequestBody AiRequest request) {
        return ResponseEntity.ok(aiService.generateSmartGoal(request.getPrompt()));
    }
}

@Data
class AiRequest {
    private String prompt;
}
