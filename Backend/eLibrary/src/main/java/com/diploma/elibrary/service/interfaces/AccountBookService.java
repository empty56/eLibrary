package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.*;

import java.util.List;

public interface AccountBookService {
    AccountBook getAccountBook(Long account_id, Long book_id);
    AccountBook createAccountBook(Account account, Book book);
    AccountBook updateAccountBook(Long id, AccountBook accountBookDetails);
    void deleteAccountBook(Book book) ;

    List<AccountBookDTO> getAccountBookByAccount(Long account_id);

    StatisticsDTO getStatistics(Long account_id);
}
