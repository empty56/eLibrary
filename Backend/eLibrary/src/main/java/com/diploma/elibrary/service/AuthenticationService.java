package com.diploma.elibrary.service;

import com.diploma.elibrary.model.Account;
import com.diploma.elibrary.model.Role;
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
    private final AccountServicesImpl accountServices;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request){
        var account = Account.builder()
                .username(request.getUsername())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        accountServices.createAccount(account);
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).role(Role.USER).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){

        var account2 = accountServices.findByEmail(request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        account2.getUsername(),
                        request.getPassword())
        );
        var account = accountServices.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).role(account.getRole()).build();
    }
}
