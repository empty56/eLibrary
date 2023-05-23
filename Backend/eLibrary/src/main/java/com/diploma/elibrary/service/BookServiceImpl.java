package com.diploma.elibrary.service;


import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.service.interfaces.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final LinkServiceImpl linkService;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, LinkServiceImpl linkService) {
        this.bookRepository = bookRepository;
        this.linkService = linkService;
    }
    @Override
    public Book findByTitle(String title) {
        return bookRepository.findBookByTitle(title).orElseThrow(() -> new ResourceNotFoundException("No such book"));
    }

    @Override
    public List<Book> searchBooks(String search) {
        try{
            Integer published = Integer.valueOf(search);
            return bookRepository.findBookByPublished(published).orElseThrow(() -> new ResourceNotFoundException("Nothing found"));
        }
        catch (NumberFormatException e) {
            return bookRepository.findBooksByTitleOrAuthorsOrGenreOrSubtitle(search).orElseThrow(() -> new ResourceNotFoundException("Nothing found"));
        }
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> getMostPopularBooks() {
        bookRepository.findAll();
        return bookRepository.findAll();
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book doesn't exist with this id: " + id));
        book.setGenre(bookDetails.getGenre());
        book.setAuthors(bookDetails.getAuthors());
        book.setPublished(bookDetails.getPublished());
        book.setSubtitle(bookDetails.getSubtitle());
        book.setTitle(bookDetails.getTitle());
        book.setDescription(bookDetails.getDescription());
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book doesn't exist with this id: " + id));
        linkService.deleteLink(book);
        bookRepository.delete(book);
    }
}
