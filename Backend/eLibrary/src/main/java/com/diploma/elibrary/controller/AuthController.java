package com.diploma.elibrary.controller;

import com.diploma.elibrary.exception.AuthorizationFailed;
import com.diploma.elibrary.security.auth.AuthenticationRequest;
import com.diploma.elibrary.security.auth.AuthenticationResponse;
import com.diploma.elibrary.security.auth.RegisterRequest;
import com.diploma.elibrary.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authentication(@RequestBody AuthenticationRequest request) {
        Object response = service.authenticate(request);
        if(response.getClass() == AuthorizationFailed.class)
        {
            return ResponseEntity.status(HttpStatus.LOCKED).body(response);
        }
        return ResponseEntity.ok(response);
    }
}
