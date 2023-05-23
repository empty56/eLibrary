package com.diploma.elibrary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="accountsBooks")
public class AccountBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;
    @Column(name = "bought")
    private boolean bought;
    @Column(name = "favourite")
    private boolean favourite;

    @Column(name = "wanted")
    private boolean wanted;
    @Column(name = "reading")
    private boolean reading;
    @Column(name = "already_read")
    private boolean already_read;
    @Column(name = "current_page")
    private Integer current_page;
}
