package com.example.lostfound.repository;

import com.example.lostfound.entity.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {
    List<ScanHistory> findByTag_IdOrderByTimestampDesc(long TagId);
}
