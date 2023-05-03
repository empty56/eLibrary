package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.ResourceNotFoundException;
import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.Role;
import com.diploma.elibrary.repository.AccountRepository;
import com.diploma.elibrary.security.auth.AuthenticationRequest;
import com.diploma.elibrary.security.auth.AuthenticationResponse;
import com.diploma.elibrary.security.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AccountRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request){
        var account = Account.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(account);
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );
        var account = repository.findAccountByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("No such account"));
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
