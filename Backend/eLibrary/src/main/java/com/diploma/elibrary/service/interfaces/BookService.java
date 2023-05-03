package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Book;

public interface BookService {
    Book findByTitle(String title);
    Book createBook(Book account);


}
