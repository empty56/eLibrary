package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.model.Review;
import com.diploma.elibrary.repository.AccountRepository;
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
    private final AccountRepository accountRepository;

    @Autowired
    public ReviewServiceImpl(BookRepository bookRepository,
                             ReviewRepository reviewRepository,
                             AccountRepository accountRepository) {
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
        this.accountRepository = accountRepository;
    }
    @Override
    public List<Review> getReviewsByBook(Long book_id) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new RuntimeException("No book with id: " + book_id));
        return reviewRepository.findAllByBook(book).orElseThrow(() -> new RuntimeException("No review for this book" ));
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }


    @Override
    public Review createReview(Long account_id, Long book_id, Review reviewDetails) {
        Account account = accountRepository.findById(account_id).orElseThrow(()->new ResourceNotFoundException("No account with such id"));
        Book book = bookRepository.findById(book_id).orElseThrow(()->new ResourceNotFoundException("No account with such id"));
        Review updatedReview = new Review();
        updatedReview.setRating(reviewDetails.getRating());
        updatedReview.setReview(reviewDetails.getReview());
        updatedReview.setAccount(account);
        updatedReview.setBook(book);
        return reviewRepository.save(updatedReview);
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

    public void deleteReviewsByBook(Book book) {
        reviewRepository.deleteReviewsByBook(book);
    }

}
