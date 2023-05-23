package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Book;

import java.io.File;
import java.util.List;

public interface BookService {
    Book findByTitle(String title);
    List<Book> searchBooks(String search);
    List<Book> getMostPopularBooks();
    List<Book> getAllBooks();


    Book createBook(Book book);

    Book updateBook(Long id, Book bookDetails);
    void deleteBook(Long id);

}
