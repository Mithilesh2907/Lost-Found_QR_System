package com.example.lostfound.service;

import com.example.lostfound.entity.ScanHistory;
import com.example.lostfound.entity.Tag;
import com.example.lostfound.repository.ScanHistoryRepository;
import com.example.lostfound.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ScanService {
    private final TagRepository tagRepository;
    private final ScanHistoryRepository scanHistoryRepository;

    public ScanService(TagRepository tagRepository,
                       ScanHistoryRepository scanHistoryRepository) {
        this.tagRepository = tagRepository;
        this.scanHistoryRepository = scanHistoryRepository;
    }

    public String processScan(String uuid, String message, Double lat, Double lng) {
        Tag tag = tagRepository.findByUuid(uuid)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        ScanHistory scanHistory = new ScanHistory();
        scanHistory.setTag(tag);
        scanHistory.setLatitude(lat);
        scanHistory.setLongitude(lng);
        scanHistory.setTimestamp(LocalDateTime.now());

        scanHistoryRepository.save(scanHistory);

        System.out.println("Message received " + message);

        return "Scan saved successfully";
    }
}
