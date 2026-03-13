package com.example.lostfound.dto;

import lombok.Data;

@Data
public class RegisterReq {
    private String email;
    private String phoneNumber;
    private String password;
}
