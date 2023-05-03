package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.service.AccountServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("library")
public class AccountController {

    private final AccountServicesImpl accountService;
    @Autowired
    public AccountController(AccountServicesImpl accountService) {
        this.accountService = accountService;
    }

    //get all accounts
    @GetMapping("/users/{user}")
    public ResponseEntity<Account> getByUsername(@PathVariable String user) {
        return ResponseEntity.ok(accountService.findByUsername(user));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Account> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(accountService.findByEmail(email));
    }

    @PutMapping("/account/{id}/new-password")
    public ResponseEntity<Account> setNewPassword(@PathVariable Long id, @RequestParam String new_password) {
        return ResponseEntity.ok(accountService.updatePassword(id, new_password));
    }

    @PostMapping("/account/new")
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(accountService.createAccount(account));
    }

}
