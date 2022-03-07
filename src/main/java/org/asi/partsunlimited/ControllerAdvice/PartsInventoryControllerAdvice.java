package org.asi.partsunlimited.ControllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class PartsInventoryControllerAdvice{

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String>  handleException(Exception e){
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
    }



}
