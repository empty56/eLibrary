package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<List<Review>> findAllByBook(Book book);
}
