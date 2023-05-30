package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;

import java.util.List;

public interface BookService {
    Book findByTitle(String title);
    List<Book> searchBooks(String search);
    List<Book> getBestRatedBooks();
    List<Book> getAllBooks();
    Book createBook(Book book);
    Double getBookRating(Long book_id);
    Book updateBook(Long id, Book bookDetails);
    void deleteBook(Long id);
    List<Book> getAllAccountBooks(Long account_id);

    List<Book> getRecommendedBooks(Long account_id);

}
