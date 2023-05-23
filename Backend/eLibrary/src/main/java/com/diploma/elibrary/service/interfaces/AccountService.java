package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Account;

public interface AccountService {
    boolean emailExists(String email);
    Account findByEmail(String email);
    Account updatePassword(Long id, String new_password);

    Account updateAccount(Long id, Account accountDetails);
    Account createAccount(Account account);


}
