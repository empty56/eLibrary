package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.AlreadyExists;
import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.AccountBook;
import com.diploma.elibrary.model.Role;
import com.diploma.elibrary.repository.AccountBookRepository;
import com.diploma.elibrary.repository.AccountRepository;
import com.diploma.elibrary.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServicesImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public AccountServicesImpl(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Account updatePassword(Long id, String new_password) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account doesn't exist with this id: " + id));
        String hashed_password = passwordEncoder.encode(new_password);
        account.setPassword(hashed_password);
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(Long id, Account accountDetails) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account doesn't exist with this id: " + id));
        account.setFirstname(accountDetails.getFirstname());
        account.setLastname(accountDetails.getLastname());
        account.setBlocked(accountDetails.isBlocked());
        return accountRepository.save(account);
    }



    @Override
    public Account createAccount(Account account) {
        account.setRole(Role.USER);
        account.setBlocked(false);
        if(emailExists(account.getEmail())) {
            throw new AlreadyExists("Email already exists");
        }
        String hashed_password = passwordEncoder.encode(account.getPassword());
        account.setPassword(hashed_password);
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getUsers() {
        return accountRepository.getAccountsByRole().orElse(new ArrayList<>());
    }

    @Override
    public boolean emailExists(String email) {
        Optional<Account> account = accountRepository.findAccountByEmail(email);
        return account.isPresent();
    }

    @Override
    public Account findByEmail(String email) {
        return accountRepository.findAccountByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with this email not found"));
    }



}
