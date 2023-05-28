package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;

public interface AccountBookService {
    AccountBook getAccountBook(Long account_id, Long book_id);
    AccountBook createAccountBook(Account account, Book book);
    AccountBook updateAccountBook(Long id, AccountBook accountBookDetails);
    void deleteAccountBook(Book book) ;

}
