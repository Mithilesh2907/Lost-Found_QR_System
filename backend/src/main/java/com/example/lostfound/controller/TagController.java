package com.example.lostfound.controller;

import com.example.lostfound.dto.TagDTO;
import com.example.lostfound.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tags")
@CrossOrigin(origins = { "http://localhost:5173", "https://lost-found-qr-system.vercel.app" })
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping
    public ResponseEntity<TagDTO> createTag(@RequestBody Map<String, String> request, Authentication authentication) {
        String email = authentication.getName();
        String itemName = request.get("itemName");
        return ResponseEntity.ok(tagService.createTag(email, itemName));
    }

    @GetMapping
    public ResponseEntity<List<TagDTO>> getUserTags(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(tagService.getUserTags(email));
    }
}
