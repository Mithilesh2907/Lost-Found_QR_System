package com.example.lostfound.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String uuid;

    private String itemName;
    private boolean isActive;

    @ManyToOne
    private User owner;
}