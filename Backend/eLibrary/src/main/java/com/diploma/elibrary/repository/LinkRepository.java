package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long> {
    Optional<List<Link>> findAllByBook(Book book);
}
