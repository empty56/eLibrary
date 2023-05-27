package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;

import java.util.List;

public interface LinkService {

    List<Link> getAllLinks();
    Link createLink(Long book_id);
    Link updateLink(Long id, Link linkDetails);
    void deleteLinks(Book book);
    Link getBookLink(Long book_id);
}
