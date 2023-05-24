package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.AlreadyExists;
import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.repository.LinkRepository;
import com.diploma.elibrary.service.interfaces.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LinkServiceImpl implements LinkService {

    private final BookRepository bookRepository;
    private final LinkRepository linkRepository;
    private final S3Service awsRepository;


    @Autowired
    public LinkServiceImpl(BookRepository bookRepository, LinkRepository linkRepository, S3Service awsRepository) {
        this.bookRepository = bookRepository;
        this.linkRepository = linkRepository;
        this.awsRepository = awsRepository;
    }
    @Override
    public List<Link> getAllLinks() {
        return linkRepository.findAll();
    }


    @Override
    public Link createLink(Long book_id) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new ResourceNotFoundException("No book this this id"));
        Optional<Link> checkLink = linkRepository.findByBook(book);
        if(checkLink.isPresent())
            throw new AlreadyExists("Link with this book already exists");
        Link link = new Link();
        link.setBook(book);
        return linkRepository.save(link);
    }

    @Override
    public Link updateLink(Long id, Link linkDetails) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Link doesn't exist with this id: " + id));
        link.setAudio_key(linkDetails.getAudio_key());
        link.setPdf_key(linkDetails.getPdf_key());
        link.setThumbnail_key(linkDetails.getThumbnail_key());
        return linkRepository.save(link);
    }

    @Override
    public void deleteLink(Book book) {
        linkRepository.deleteLinksByBook(book);
    }
}
