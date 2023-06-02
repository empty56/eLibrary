package com.diploma.elibrary.service;

import com.diploma.elibrary.exception.AuthorizationFailed;
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
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        accountServices.createAccount(account);
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).role(Role.USER).build();
    }

    public Object authenticate(AuthenticationRequest request){
        var account = accountServices.findByEmail(request.getEmail());
        if(account.isBlocked())
        {
            return new AuthorizationFailed("Your account is blocked");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );

        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).role(account.getRole()).build();
    }
}
