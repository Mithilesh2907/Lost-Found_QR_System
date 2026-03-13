package com.example.lostfound.dto;

import lombok.Data;

@Data
public class TagDTO {
    private String uuid;
    private String itemName;
    private boolean isActive;
}
