package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.model.Review;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.repository.ReviewRepository;
import com.diploma.elibrary.service.interfaces.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(BookRepository bookRepository, ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }
    @Override
    public List<Review> getReviews(Long book_id) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new RuntimeException("No book with id: " + book_id));
        return reviewRepository.findAllByBook(book).orElseThrow(() -> new RuntimeException("No review for this book" ));
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }


    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review doesn't exist with this id: " + id));
        review.setReview(reviewDetails.getReview());
        review.setRating(reviewDetails.getRating());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review doesn't exist with this id: " + id));
        reviewRepository.delete(review);
    }
}
