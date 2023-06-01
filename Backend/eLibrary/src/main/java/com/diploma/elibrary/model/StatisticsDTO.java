package com.diploma.elibrary.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatisticsDTO {
    Integer totalPages;
    Integer totalFinishedBooks;
    Integer totalBooksInLibrary;
    Integer totalReviews;
    String fullName;
}
