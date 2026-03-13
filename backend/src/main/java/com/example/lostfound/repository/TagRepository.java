package com.example.lostfound.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lostfound.entity.Tag;

import java.util.Optional;

import com.example.lostfound.entity.User;
import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByUuid(String uuid);
    List<Tag> findByOwner(User owner);
}
