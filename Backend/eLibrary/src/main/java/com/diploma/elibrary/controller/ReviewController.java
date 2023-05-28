package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Review;
import com.diploma.elibrary.service.ReviewServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class ReviewController {
    private final ReviewServiceImpl service;
    @Autowired
    public ReviewController(ReviewServiceImpl reviewService) {
        this.service = reviewService;
    }

    @GetMapping("/noauth/reviews/{book_id}")
    public ResponseEntity<List<Review>> getReviewsByBook(@PathVariable Long book_id) {
        return ResponseEntity.ok(service.getReviewsByBook(book_id));
    }

    @GetMapping("/noauth/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(service.getAllReviews());
    }

    @PutMapping("/review/update/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review review) {
        return ResponseEntity.ok(service.updateReview(id, review));
    }

    @PostMapping("/review/new/account/{account_id}/book/{book_id}")
    public ResponseEntity<Review> createReview(@PathVariable Long account_id, @PathVariable Long book_id, @RequestBody Review review) {
        return ResponseEntity.ok(service.createReview(account_id, book_id, review));
    }

    @DeleteMapping("/review/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReview(@PathVariable Long id) {
        service.deleteReview(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
