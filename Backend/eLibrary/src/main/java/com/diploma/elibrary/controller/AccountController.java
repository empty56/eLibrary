package com.diploma.elibrary.controller;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.service.AccountServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("library")
public class AccountController {

    private final AccountServicesImpl service;
    @Autowired
    public AccountController(AccountServicesImpl accountService) {
        this.service = accountService;
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Boolean> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(service.usernameExists(username));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Boolean> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.emailExists(email));
    }

    @PutMapping("/account/{id}/new-password")
    public ResponseEntity<Account> setNewPassword(@PathVariable Long id, @RequestParam String new_password) {
        return ResponseEntity.ok(service.updatePassword(id, new_password));
    }

    @PostMapping("/account/update/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id,@RequestBody Account account) {
        return ResponseEntity.ok(service.updateAccount(id, account));
    }

}
