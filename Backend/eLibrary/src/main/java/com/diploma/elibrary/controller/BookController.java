package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.service.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class BookController {
    private final BookServiceImpl service;
    @Autowired
    public BookController(BookServiceImpl bookService) {
        this.service = bookService;
    }

    //get all accounts
    @GetMapping("/book/search/{search}")
    public ResponseEntity<List<Book>> searchBooks(@PathVariable String search) {
        return ResponseEntity.ok(service.searchBooks(search));
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(service.getAllBooks());
    }

    @PutMapping("/book/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        return ResponseEntity.ok(service.updateBook(id, book));
    }

    @PostMapping("/book/new")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.ok(service.createBook(book));
    }

    @DeleteMapping("/book/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
