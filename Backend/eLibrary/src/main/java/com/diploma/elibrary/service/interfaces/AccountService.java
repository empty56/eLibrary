package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Account;

public interface AccountService {
    Account findByEmail(String email);
    Account findByUsername(String email);

    Account updatePassword(Long id, String new_password);

    Account createAccount(Account account);

}
