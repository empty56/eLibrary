package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findBookByTitle(String title);

    @Query(value = "SELECT * FROM books WHERE title ILIKE %?1% OR authors ILIKE %?1% OR genre ILIKE %?1% OR subtitle ILIKE %?1% ", nativeQuery = true)
    Optional<List<Book>> findBooksByTitleOrAuthorsOrGenreOrSubtitle(String search);

    Optional<List<Book>> findBookByPublished(Integer published);
}
