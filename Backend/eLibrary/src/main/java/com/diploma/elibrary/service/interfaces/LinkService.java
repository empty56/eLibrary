package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface LinkService {

    List<Link> getLinks(Long book_id);
    Link createLink(Long book_id, MultipartFile bookFile, MultipartFile audioFile, MultipartFile photoFile);
    Link updateLink(Long id, Link linkDetails);
    void deleteLink(Book book);
}