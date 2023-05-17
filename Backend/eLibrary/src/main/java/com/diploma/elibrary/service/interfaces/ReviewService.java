package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviews(Long book_id);
    Review createReview(Review review);
    Review updateReview(Long id, Review reviewDetails);
    void deleteReview(Long id);
    List<Review> getAllReviews();
}
