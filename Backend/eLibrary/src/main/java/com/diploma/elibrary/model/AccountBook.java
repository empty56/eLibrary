package com.diploma.elibrary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="accounts_books")
@JsonIgnoreProperties({"book", "account"})
public class AccountBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    private Book book;
    @ManyToOne(fetch = FetchType.EAGER)
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

    @Override
    public String toString() {
        return "Link{" +
                "id=" + id +
                ", book_id='" + book.getId() + '\'' +
                ", account_id='" + account.getId() + '\'' +
                ", bought='" + bought + '\'' +
                ", favourite='" + favourite + '\'' +
                ", wanted='" + wanted + '\'' +
                ", already_read='" + already_read + '\'' +
                ", current_page='" + current_page + '\'' +
                '}';
    }
}
