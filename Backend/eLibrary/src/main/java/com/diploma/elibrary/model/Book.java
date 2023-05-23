package com.diploma.elibrary.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="books")
@JsonIgnoreProperties({"reviews", "accountBooks"})
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "subtitle")
    private String subtitle;
    @Column(name = "authors")
    private String authors;
    @Column(name = "genre")
    private String genre;
    @Column(name = "description")
    private String description;
    @Column(name = "published")
    private Integer published;
    @Column(name = "pages")
    private Integer pages;
    @JsonManagedReference
    @OneToOne(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Link link;
    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    private List<Review> reviews = new ArrayList<>();
    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    private List<AccountBook> accountBooks = new ArrayList<>();


    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                ", authors='" + authors + '\'' +
                ", genre='" + genre + '\'' +
                ", description='" + description + '\'' +
                ", published=" + published +
                ", pages=" + pages +
                ", link=" + link +
                '}';
    }
}
