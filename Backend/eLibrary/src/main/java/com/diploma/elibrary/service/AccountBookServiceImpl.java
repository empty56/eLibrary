package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.AlreadyExists;
import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.*;
import com.diploma.elibrary.repository.*;
import com.diploma.elibrary.service.interfaces.AccountBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountBookServiceImpl implements AccountBookService {

    private final AccountBookRepository accountBookRepository;
    private final AccountRepository accountRepository;
    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public AccountBookServiceImpl(AccountBookRepository accountBookRepository,
                                  AccountRepository accountRepository,
                                  BookRepository bookRepository,
                                  ReviewRepository reviewRepository) {
        this.accountBookRepository = accountBookRepository;
        this.accountRepository = accountRepository;
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
    }
    @Override
    public AccountBook getAccountBook(Long account_id, Long book_id) {
        Account account = accountRepository.findById(account_id).orElseThrow(()-> new ResourceNotFoundException("No account with such id"));
        Book book = bookRepository.findById(book_id).orElseThrow(()-> new ResourceNotFoundException("No book with such id"));
        return accountBookRepository.findAccountBookByAccountAndBook(account, book).orElseGet(() ->  createAccountBook(account, book));
    }

    @Override
    public List<AccountBookDTO> getAccountBookByAccount(Long account_id) {
        Account account = accountRepository.findById(account_id).orElseThrow(()-> new ResourceNotFoundException("No account with such id"));
        List<AccountBook> accountBooks =  accountBookRepository.findAccountBooksByAccount(account).orElseGet(ArrayList::new);
        List<AccountBookDTO> accountBookDTOs = new ArrayList<>();
        for (AccountBook accountBook: accountBooks) {
            accountBookDTOs.add(new AccountBookDTO(accountBook.getId(),
                    accountBook.getBook(),
                    accountBook.getAccount(),
                    accountBook.isBought(),
                    accountBook.isFavourite(),
                    accountBook.isWanted(),
                    accountBook.isReading(),
                    accountBook.isAlready_read()));
        }
        return accountBookDTOs;
    }

    @Override
    public AccountBook createAccountBook(Account account, Book book) {
        AccountBook accountBook = new AccountBook();
        accountBook.setAccount(account);
        accountBook.setBook(book);
        accountBook.setBought(false);
        accountBook.setFavourite(false);
        accountBook.setReading(false);
        accountBook.setAlready_read(false);
        accountBook.setWanted(false);
        return accountBookRepository.save(accountBook);
    }

    @Override
    public AccountBook updateAccountBook(Long id, AccountBook accountBookDetails) {
        AccountBook newAccountBook = accountBookRepository.findById(id).orElseGet(
                () -> createAccountBook(accountBookDetails.getAccount(), accountBookDetails.getBook()));
        newAccountBook.setWanted(accountBookDetails.isWanted());
        newAccountBook.setBought(accountBookDetails.isBought());
        newAccountBook.setFavourite(accountBookDetails.isFavourite());
        newAccountBook.setReading(accountBookDetails.isReading());
        newAccountBook.setAlready_read(accountBookDetails.isAlready_read());
        return accountBookRepository.save(newAccountBook);
    }

    @Override
    public void deleteAccountBook(Book book) {
        accountBookRepository.deleteAllByBook(book);
    }

    @Override
    public StatisticsDTO getStatistics(Long account_id){
        int totalPages = 0;
        int totalFinishedBooks = 0;
        int totalBooksInLibrary = 0;
        Account account = accountRepository.findById(account_id).orElseThrow(()-> new RuntimeException("Account not found"));
        String fullName = account.getFirstname() + " " + account.getLastname();
        List<AccountBook> accountBooks = accountBookRepository.findAccountBooksByAccount(account).orElseGet(ArrayList::new);
        int totalReviews = reviewRepository.findReviewsByAccount(account).orElseGet(ArrayList::new).size();
        for(AccountBook accountBook: accountBooks)
        {
            if(accountBook.isBought())
                totalBooksInLibrary++;
            if(accountBook.isAlready_read()) {
                totalPages += accountBook.getBook().getPages();
                totalFinishedBooks++;
            }
        }
        return new StatisticsDTO(totalPages, totalFinishedBooks, totalBooksInLibrary, totalReviews, fullName);
    }
}
