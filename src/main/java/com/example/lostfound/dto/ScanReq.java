package com.example.lostfound.dto;

import lombok.Data;

@Data
public class ScanReq {
    private String message;
    private Double lat;
    private Double lng;
}
