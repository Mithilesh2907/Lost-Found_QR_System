package com.example.lostfound.controller;

import com.example.lostfound.dto.ScanReq;
import com.example.lostfound.service.ScanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/scan")
@CrossOrigin(origins = "https://localhost:3000")
public class ScanController {

    private final ScanService scanService;

    public ScanController(ScanService scanService) {
        this.scanService = scanService;
    }

    @PostMapping("/{uuid}")
    public ResponseEntity<?> scanItem(
            @PathVariable String uuid,
            @RequestBody ScanReq request
    ) {
        String response = scanService.processScan(
                uuid,
                request.getMessage(),
                request.getLat(),
                request.getLng()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/history/{uuid}")
    public ResponseEntity<?> getHistory(@PathVariable String uuid) {
        return ResponseEntity.ok(scanService.getHistory(uuid));
    }
}
