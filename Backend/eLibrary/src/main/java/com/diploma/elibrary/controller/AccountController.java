package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.service.AccountServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class AccountController {

    private final AccountServicesImpl service;
    @Autowired
    public AccountController(AccountServicesImpl accountService) {
        this.service = accountService;
    }


    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.emailExists(email));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Account> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.findByEmail(email));
    }

    @PutMapping("/account/{id}/new-password")
    public ResponseEntity<Account> setNewPassword(@PathVariable Long id, @RequestParam String password) {
        return ResponseEntity.ok(service.updatePassword(id, password));
    }

    @PutMapping("/account/update/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id,@RequestBody Account account) {
        return ResponseEntity.ok(service.updateAccount(id, account));
    }

    @GetMapping("/users")
    public ResponseEntity<List<Account>> getUsers() {
        return ResponseEntity.ok(service.getUsers());
    }

}
