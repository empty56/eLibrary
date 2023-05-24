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
@Table(name="links")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    private Book book;
    @Column(name = "audio_key")
    private String audio_key;
    @Column(name = "pdf_key")
    private String pdf_key;
    @Column(name = "thumbnail_key")
    private String thumbnail_key;

    @Override
    public String toString() {
        return "Link{" +
                "id=" + id +
                ", audio_key='" + audio_key + '\'' +
                ", pdf_key='" + pdf_key + '\'' +
                ", thumbnail_key='" + thumbnail_key + '\'' +
                '}';
    }

}
