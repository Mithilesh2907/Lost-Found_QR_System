package com.example.lostfound.controller;

import com.example.lostfound.dto.ScanReq;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/scan")
@CrossOrigin(origins = "https://localhost:3000")
public class ScanController {

    @PostMapping("/{uuid}")
    public ResponseEntity<?> scanItem(
            @PathVariable String uuid,
            @RequestBody ScanReq request
    ) {
        return ResponseEntity.ok("Scan received.");
    }
}
