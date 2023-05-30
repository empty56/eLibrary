package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.service.BookServiceImpl;
import com.diploma.elibrary.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class BookController {
    private final BookServiceImpl service;
    private final S3Service s3Service;
    @Autowired
    public BookController(BookServiceImpl bookService, S3Service s3Service) {
        this.service = bookService;
        this.s3Service = s3Service;
    }

    //get all accounts
    @GetMapping("/noauth/books/search/{search}")
    public ResponseEntity<List<Book>> searchBooks(@PathVariable String search) {
        return ResponseEntity.ok(service.searchBooks(search));
    }

    @GetMapping("/noauth/books")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(service.getAllBooks());
    }

    @PutMapping("/admin/book/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        return ResponseEntity.ok(service.updateBook(id, book));
    }

    @PostMapping("/admin/book/new")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.ok(service.createBook(book));
    }

    @DeleteMapping("/admin/book/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/book/upload/{book_id}")
    public ResponseEntity<?> uploadBook(@PathVariable Long book_id, @RequestParam("files") MultipartFile[] files) {
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
            {
                Map<String, String> response = new HashMap<>();
                response.put("response", s3Service.uploadBook(book_id, files[0], files[1], files[2]));
                return ResponseEntity.ok(response);
            }
            else {
                String response = "Bad files";
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }
        else
        {
            String response = "Bad files";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/books/recommended/account/{account_id}")
    public ResponseEntity<List<Book>> getRecommendedBooks(@PathVariable Long account_id) {
        return ResponseEntity.ok(service.getRecommendedBooks(account_id));
    }

    @GetMapping("/noauth/books/bestRated")
    public ResponseEntity<List<Book>> getBestRatedBooks() {
        return ResponseEntity.ok(service.getBestRatedBooks());
    }

    @GetMapping("/noauth/book/rating/{book_id}")
    public ResponseEntity<Double> getBookRating(@PathVariable Long book_id) {
        return ResponseEntity.ok(service.getBookRating(book_id));
    }

    @GetMapping("/noauth/book/{book_id}")
    public ResponseEntity<Book> getBook(@PathVariable Long book_id) {
        return ResponseEntity.ok(service.getBook(book_id));
    }
    @GetMapping("/books/account/{account_id}")
    public ResponseEntity<List<Book>> getBookByAccount(@PathVariable Long account_id) {
        return ResponseEntity.ok(service.getAllAccountBooks(account_id));
    }
}
