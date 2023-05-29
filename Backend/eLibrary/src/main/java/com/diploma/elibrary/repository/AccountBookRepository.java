package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountBookRepository extends JpaRepository<AccountBook, Long> {

    Optional<AccountBook> findAccountBookByAccountAndBook(Account account, Book book);
    Optional<List<AccountBook>> findAccountBooksByAccount(Account account);
    void deleteAllByBook(Book book);
}
