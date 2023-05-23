package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.service.BookServiceImpl;
import com.diploma.elibrary.service.LinkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("api")
public class LinkController {
    private final LinkServiceImpl service;
    @Autowired
    public LinkController(LinkServiceImpl linkService) {
        this.service = linkService;
    }


    @PostMapping("/upload/link/{book_id}")
    public ResponseEntity<Link> uploadLink(@PathVariable Long book_id, @RequestParam("files") MultipartFile[] files) {
        if (files.length == 3) {
            MultipartFile book = null, audio = null, photo = null;
            for (MultipartFile file : files) {
                String filename = file.getOriginalFilename();
                if(filename.matches("(?i).*\\.(pdf)"))
                {
                    book = file;
                }
                else if(filename.matches("(?i).*\\.(mp3|wav|ogg|flac)"))
                {
                    audio = file;
                }
                else if(filename.matches("(?i).*\\.(jpg|jpeg|png|gif|bmp)"))
                {
                    photo = file;
                }
            }
            if(book != null && audio != null && photo != null && !book.isEmpty() && !audio.isEmpty() && !photo.isEmpty())
                return ResponseEntity.ok(service.createLink(book_id, files[0], files[1], files[2]));
            else return ResponseEntity.ok(null);
        }
        else
        {
            return ResponseEntity.ok(null);
        }
    }
}
