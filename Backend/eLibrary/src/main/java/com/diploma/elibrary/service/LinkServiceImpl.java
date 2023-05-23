package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.repository.LinkRepository;
import com.diploma.elibrary.service.interfaces.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkServiceImpl implements LinkService {

    private final BookRepository bookRepository;
    private final LinkRepository linkRepository;

    @Autowired
    public LinkServiceImpl(BookRepository bookRepository, LinkRepository linkRepository) {
        this.bookRepository = bookRepository;
        this.linkRepository = linkRepository;
    }
    @Override
    public List<Link> getLinks(Long book_id) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new RuntimeException("No book with id: " + book_id));
        return linkRepository.findAllByBook(book).orElseThrow(() -> new RuntimeException("No links with this book" ));
    }

    @Override
    public Link createLink(Link link) {
        return linkRepository.save(link);
    }

    @Override
    public Link updateLink(Long id, Link linkDetails) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Link doesn't exist with this id: " + id));
        link.setAudio_link(linkDetails.getAudio_link());
        link.setPdf_link(linkDetails.getPdf_link());
        link.setThumbnail_link(linkDetails.getThumbnail_link());
        return linkRepository.save(link);
    }

    @Override
    public void deleteLink(Long id) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Link doesn't exist with this id: " + id));
        linkRepository.delete(link);
    }
}
