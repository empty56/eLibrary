package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.repository.LinkRepository;
import com.diploma.elibrary.service.interfaces.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

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
    public List<Link> getLinks(Long book_id) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new RuntimeException("No book with id: " + book_id));
        return linkRepository.findAllByBook(book).orElseThrow(() -> new RuntimeException("No links with this book" ));
    }



    @Override
    public Link createLink(Long book_id, MultipartFile bookFile, MultipartFile audioFile, MultipartFile photoFile) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new ResourceNotFoundException("No book this this id"));

//        String bookExtension = bookFile.getOriginalFilename().substring(bookFile.getOriginalFilename().lastIndexOf(".") + 1);
//        String audioExtension = audioFile.getOriginalFilename().substring(audioFile.getOriginalFilename().lastIndexOf(".") + 1);
//        String photoExtension = photoFile.getOriginalFilename().substring(photoFile.getOriginalFilename().lastIndexOf(".") + 1);


        String bookKey = "books/" + book.getId();
        String audioKey = "audio/" + book.getId();
        String thumbnailKey = "thumbnail/" + book.getId();
        awsRepository.uploadFile(bookKey, bookFile);
        awsRepository.uploadFile(audioKey, audioFile);
        awsRepository.uploadFile(thumbnailKey, photoFile);
        Link link = new Link();
        link.setBook(book);
        link.setPdf_link(book.getId().toString());
        link.setAudio_link(book.getId().toString());
        link.setThumbnail_link(book.getId().toString());
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
    public void deleteLink(Book book) {
        linkRepository.deleteLinksByBook(book);
    }
}
