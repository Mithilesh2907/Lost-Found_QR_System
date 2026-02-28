package com.example.lostfound.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lostfound.entity.Tag;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByUuid(String uuid);
}
