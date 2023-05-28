package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviewsByBook(Long book_id);
    Review createReview(Long account_id, Long book_id, Review reviewDetails);
    Review updateReview(Long id, Review reviewDetails);
    void deleteReview(Long id);
    List<Review> getAllReviews();


}
