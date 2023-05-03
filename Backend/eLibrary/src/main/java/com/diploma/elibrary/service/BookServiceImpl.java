package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.AlreadyExists;
import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.service.interfaces.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    @Override
    public Book findByTitle(String title) {
        Book book =  bookRepository.findBookByTitle(title).orElseThrow(() -> new ResourceNotFoundException("No such book"));
        return book;
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
}
