package com.example.lostfound.service;

import com.example.lostfound.dto.TagDTO;
import com.example.lostfound.entity.Tag;
import com.example.lostfound.entity.User;
import com.example.lostfound.repository.TagRepository;
import com.example.lostfound.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    public TagService(TagRepository tagRepository, UserRepository userRepository) {
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public TagDTO createTag(String email, String itemName) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Tag tag = new Tag();
        tag.setUuid(UUID.randomUUID().toString());
        tag.setItemName(itemName);
        tag.setActive(true);
        tag.setOwner(user);

        tagRepository.save(tag);

        TagDTO dto = new TagDTO();
        dto.setUuid(tag.getUuid());
        dto.setItemName(tag.getItemName());
        dto.setActive(tag.isActive());

        return dto;
    }

    public List<TagDTO> getUserTags(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return tagRepository.findByOwner(user).stream().map(tag -> {
            TagDTO dto = new TagDTO();
            dto.setUuid(tag.getUuid());
            dto.setItemName(tag.getItemName());
            dto.setActive(tag.isActive());
            return dto;
        }).collect(Collectors.toList());
    }
}
