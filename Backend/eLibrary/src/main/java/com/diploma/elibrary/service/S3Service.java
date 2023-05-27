package com.diploma.elibrary.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;

import com.amazonaws.util.IOUtils;
import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Link;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;


@Component
public class S3Service {

    private final AmazonS3 s3Client;
    private final LinkRepository linkRepository;
    private final BookRepository bookRepository;

    @Value("${application.bucket.name}")
    private String bucketName;
    @Autowired
    public S3Service(AmazonS3 s3Client, LinkRepository linkRepository, BookRepository bookRepository) {
        this.s3Client = s3Client;
        this.linkRepository = linkRepository;
        this.bookRepository = bookRepository;
    }


    public void uploadFile(String key, MultipartFile file) {
        File fileObj = convertMultiPartFileToFile(file);
        try {
            s3Client.putObject(bucketName, key, fileObj);
            fileObj.delete();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }

    public void deleteFile(String key) {
        try {
            s3Client.deleteObject(bucketName, key);
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
    }

    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String uploadBook(Long book_id, MultipartFile bookFile, MultipartFile audioFile, MultipartFile photoFile) {
        Book book = bookRepository.findById(book_id).orElseThrow(() -> new ResourceNotFoundException("No book with such id"));
        Link link = linkRepository.findByBook(book).orElseThrow(() -> new ResourceNotFoundException("No link with such book_id"));
        String bookKey = "books/" + book_id;
        String audioKey = "audio/" + book_id;
        String thumbnailKey = "thumbnail/" + book_id;
        this.uploadFile(bookKey, bookFile);
        this.uploadFile(audioKey, audioFile);
        this.uploadFile(thumbnailKey, photoFile);
        link.setPdf_key(bookKey);
        link.setAudio_key(audioKey);
        link.setThumbnail_key(thumbnailKey);
        linkRepository.save(link);
        return "Uploaded successfully";

    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            System.out.println("Error converting multipartFile to file");
        }
        return convertedFile;
    }

}
