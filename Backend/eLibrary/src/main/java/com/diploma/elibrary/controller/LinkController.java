package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.service.BookServiceImpl;
import com.diploma.elibrary.service.LinkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("library")
public class LinkController {
    private final LinkServiceImpl service;
    @Autowired
    public LinkController(LinkServiceImpl linkService) {
        this.service = linkService;
    }



}
