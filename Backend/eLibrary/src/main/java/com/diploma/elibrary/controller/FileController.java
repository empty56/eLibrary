package com.diploma.elibrary.controller;

import com.diploma.elibrary.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api")
public class FileController {
    private final S3Service s3Service;
    @Autowired
    public FileController(S3Service s3Service) {
        this.s3Service = s3Service;
    }
    @GetMapping("/download/audio/book/{book_id}")
    public ResponseEntity<?> downloadAudioFile(@PathVariable Long book_id) {
        String fileName = "audio/" + book_id;
        return ResponseEntity.ok(s3Service.downloadFile(fileName));
    }
    @GetMapping("/download/pdf/book/{book_id}")
    public ResponseEntity<?> downloadPdfFile(@PathVariable Long book_id) {
        String fileName = "books/" + book_id;
        return ResponseEntity.ok(s3Service.downloadFile(fileName));
    }
    @GetMapping("/download/photo/book/{book_id}")
    public ResponseEntity<?> downloadThumbnailFile(@PathVariable Long book_id) {
        String fileName = "thumbnail/" + book_id;
        return ResponseEntity.ok(s3Service.downloadFile(fileName));
    }
}
