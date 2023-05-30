package com.diploma.elibrary.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountBookDTO {
    private Long id;
    private Book book;
    private Account account;
    private boolean bought;
    private boolean favourite;

    private boolean wanted;
    private boolean reading;
    private boolean already_read;
}
