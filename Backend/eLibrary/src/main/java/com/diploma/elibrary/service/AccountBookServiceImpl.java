package com.diploma.elibrary.service;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.repository.AccountBookRepository;
import com.diploma.elibrary.service.interfaces.AccountBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountBookServiceImpl implements AccountBookService {

    private final AccountBookRepository accountBookRepository;

    @Autowired
    public AccountBookServiceImpl(AccountBookRepository accountBookRepository) {
        this.accountBookRepository = accountBookRepository;
    }
    @Override
    public AccountBook getAccountBook(Account account, Book book) {
        return accountBookRepository.findAccountBookByAccountAndBook(account, book).orElse(createAccountBook(account, book));
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
        accountBook.setCurrent_page(0);
        return accountBookRepository.save(accountBook);
    }

    @Override
    public AccountBook updateAccountBook(Long id, AccountBook accountBookDetails) {
        AccountBook newAccountBook = accountBookRepository.findById(id).orElse(createAccountBook(accountBookDetails.getAccount(), accountBookDetails.getBook()));
        newAccountBook.setWanted(accountBookDetails.isWanted());
        newAccountBook.setBought(accountBookDetails.isBought());
        newAccountBook.setFavourite(accountBookDetails.isFavourite());
        newAccountBook.setReading(accountBookDetails.isReading());
        newAccountBook.setAlready_read(accountBookDetails.isAlready_read());
        newAccountBook.setCurrent_page(accountBookDetails.getCurrent_page());
        return newAccountBook;
    }

    @Override
    public void deleteAccountBook(Book book) {
        accountBookRepository.deleteAllByBook(book);
    }
}
