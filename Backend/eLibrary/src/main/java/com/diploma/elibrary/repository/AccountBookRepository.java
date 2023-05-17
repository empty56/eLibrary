package com.diploma.elibrary.repository;

import com.diploma.elibrary.model.AccountBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountBookRepository extends JpaRepository<AccountBook, Long> {

    
}
