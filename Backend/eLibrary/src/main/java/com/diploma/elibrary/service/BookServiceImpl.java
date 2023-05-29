package com.diploma.elibrary.service;


import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.model.Review;
import com.diploma.elibrary.repository.AccountBookRepository;
import com.diploma.elibrary.repository.AccountRepository;
import com.diploma.elibrary.repository.BookRepository;
import com.diploma.elibrary.service.interfaces.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final LinkServiceImpl linkService;
    private final AccountRepository accountRepository;
    private final AccountBookRepository accountBookRepository;
    private final ReviewServiceImpl reviewService;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository,
                           LinkServiceImpl linkService,
                           ReviewServiceImpl reviewService,
                           AccountBookRepository accountBookRepository,
                           AccountRepository accountRepository) {
        this.bookRepository = bookRepository;
        this.linkService = linkService;
        this.reviewService = reviewService;
        this.accountBookRepository = accountBookRepository;
        this.accountRepository = accountRepository;
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
    public Double getBookRating(Long book_id) {
        List<Review> reviews = reviewService.getReviewsByBook(book_id);
        Double avgRating = 0.0;
        int counter = 0;
        if(reviews.isEmpty())
            return 0.0;
        for(Review review : reviews)
        {
            avgRating += Double.valueOf(review.getRating());
            counter++;
        }
        avgRating = avgRating/counter;
        return avgRating;
    }

    public Book getBook(Long book_id) {
        return bookRepository.findById(book_id).orElseThrow(() -> new ResourceNotFoundException("Book not found"));
    }

    @Override
    public List<Book> getBestRatedBooks() {
        Map<Long, Integer> ratings = new HashMap<>();
        Map<Long, Integer> counters = new HashMap<>();
        List<Review> reviews = reviewService.getAllReviews();
        for(Review review : reviews)
        {
            if(ratings.containsKey(review.getBook().getId()))
            {
                Integer new_rating = ratings.get(review.getBook().getId()) + review.getRating();
                ratings.replace(review.getBook().getId(), new_rating);
                counters.replace(review.getBook().getId(), counters.get(review.getBook().getId())+1);
            }
            else
            {
                ratings.put(review.getBook().getId(), review.getRating());
                counters.put(review.getBook().getId(), 1);
            }
        }
        Map<Long, Double> avgRatings = new HashMap<>();
        for(Map.Entry<Long, Integer> entry : ratings.entrySet())
        {
            avgRatings.put(entry.getKey(), Double.valueOf(entry.getValue())/Double.valueOf(counters.get(entry.getKey())));
        }
        avgRatings = sortByValueDesc(avgRatings);
        int counter= 0;
        List<Book> bestRatedBooks = new ArrayList<>();
        for(Map.Entry<Long, Double> entry : avgRatings.entrySet())
        {
            if(counter >= 8)
                break;
            bestRatedBooks.add(bookRepository.findById(entry.getKey()).orElseThrow(() -> new ResourceNotFoundException("Wrong book_id")));
            counter++;
        }
        return bestRatedBooks;
    }

    @Override
    public Book createBook(Book book) {
        Book new_book =bookRepository.save(book);
        linkService.createLink(new_book.getId());
        return new_book;
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
    @Transactional
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book doesn't exist with this id: " + id));
        accountBookRepository.deleteAllByBook(book);
        linkService.deleteLinks(book);
        bookRepository.delete(book);
    }

    @Override
    public List<Book> getAllAccountBooks(Long account_id) {
        Account account = accountRepository.findById(account_id).orElseThrow(()-> new ResourceNotFoundException("No account with this id"));
        List<AccountBook> accountBooks = accountBookRepository.findAccountBooksByAccount(account).orElseThrow(()-> new RuntimeException("AccountBooks not found"));
        List<Book> books = new ArrayList<>();
        for(AccountBook accountBook: accountBooks)
        {
            Book book = accountBook.getBook();
            books.add(book);
        }
        return books;
    }

    private static <K, V extends Comparable<? super V>> Map<K, V> sortByValueDesc(Map<K, V> map) {
        List<Map.Entry<K, V>> list = new ArrayList<>(map.entrySet());
        list.sort(Map.Entry.<K, V>comparingByValue().reversed());
        Map<K, V> sortedMap = new LinkedHashMap<>();
        for (Map.Entry<K, V> entry : list) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        return sortedMap;
    }
}
