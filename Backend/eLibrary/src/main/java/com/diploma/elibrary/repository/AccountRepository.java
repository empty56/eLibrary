package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findAccountByEmail(String email);

    @Query(value = "SELECT * FROM accounts WHERE role = 'USER' ", nativeQuery = true)
    Optional<List<Account>> getAccountsByRole();
}
