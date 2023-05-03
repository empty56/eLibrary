package com.diploma.elibrary.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class AuthorizationFailed extends RuntimeException{
    public AuthorizationFailed(String message){
        super(message);
    }
}
