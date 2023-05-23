package com.diploma.elibrary.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name="accounts")
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name = "blocked")
    private boolean blocked;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lastname;

    @Override
    public String getUsername() {
        return email;
    }





    @JsonManagedReference
    @OneToMany(mappedBy = "account")
    private List<Review> reviews = new ArrayList<>();
    @JsonManagedReference
    @OneToMany(mappedBy = "account")
    private List<AccountBook> accountBooks = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


