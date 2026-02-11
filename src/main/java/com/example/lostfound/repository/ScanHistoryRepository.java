package com.example.lostfound.repository;

import com.example.lostfound.entity.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {
}
