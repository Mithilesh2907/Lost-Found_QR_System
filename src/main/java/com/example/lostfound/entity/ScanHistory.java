package com.example.lostfound.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class ScanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Tag tag;

    private Double latitude;
    private Double longitude;

    private LocalDateTime timestamp;
}
