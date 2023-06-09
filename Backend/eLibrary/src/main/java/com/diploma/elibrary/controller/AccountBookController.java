package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.*;
import com.diploma.elibrary.service.AccountBookServiceImpl;
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
    @GetMapping("/account-book/account/{account_id}/book/{book_id}")
    public ResponseEntity<AccountBook> getAccountBook(@PathVariable Long account_id, @PathVariable Long book_id) {
        return ResponseEntity.ok(service.getAccountBook(account_id, book_id));
    }
    @GetMapping("/account-book/account/{account_id}")
    public ResponseEntity<List<AccountBookDTO>> getAccountBook(@PathVariable Long account_id) {
        return ResponseEntity.ok(service.getAccountBookByAccount(account_id));
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
    @GetMapping("/statistics/account/{account_id}")
    public ResponseEntity<StatisticsDTO> getAccountStatistics(@PathVariable Long account_id) {
        return ResponseEntity.ok(service.getStatistics(account_id));
    }
}
