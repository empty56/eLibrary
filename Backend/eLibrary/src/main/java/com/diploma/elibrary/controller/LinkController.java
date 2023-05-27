package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.service.LinkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api")
public class LinkController {
    private final LinkServiceImpl service;

    @Autowired
    public LinkController(LinkServiceImpl linkService) {
        this.service = linkService;
    }

    @GetMapping("/links")
    public ResponseEntity<List<Link>> getLinks() {
        return ResponseEntity.ok(service.getAllLinks());
    }

    @GetMapping("/link/{book_id}")
    public ResponseEntity<Link> getLinks(@PathVariable Long book_id) {
        return ResponseEntity.ok(service.getBookLink(book_id));
    }

    @PutMapping("/admin/link/update/{id}")
    public ResponseEntity<Link> updateLink(@PathVariable Long id, @RequestBody Link link) {
        return ResponseEntity.ok(service.updateLink(id, link));
    }

}
