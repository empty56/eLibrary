package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Book;
import com.diploma.elibrary.service.AccountBookServiceImpl;
import com.diploma.elibrary.service.AccountServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
public class AccountBookController {
    private final AccountBookServiceImpl service;
    @Autowired
    public AccountBookController(AccountBookServiceImpl accountBookService) {
        this.service = accountBookService;
    }
    @GetMapping("/account-book")
    public ResponseEntity<AccountBook> getAccountBook(@RequestBody Account account, @RequestBody Book book) {
        return ResponseEntity.ok(service.getAccountBook(account, book));
    }

    @PostMapping("/account-book/new")
    public ResponseEntity<AccountBook> createAccountBook(@RequestBody Account account, @RequestBody Book book) {
        return ResponseEntity.ok(service.createAccountBook(account, book));
    }
    @PutMapping("/account-book/update/{id}")
    public ResponseEntity<AccountBook> updateAccountBook(@PathVariable Long id, @RequestBody AccountBook accountBook) {
        return ResponseEntity.ok(service.updateAccountBook(id, accountBook));
    }
    @DeleteMapping("/account-book/delete")
    public ResponseEntity<?> deleteAccountBook(@RequestBody Book book) {
        service.deleteAccountBook(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
