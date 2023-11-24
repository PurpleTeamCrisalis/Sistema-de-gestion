package edu.bootcamp.backoffice.exception.custom;

public class UnprocessableException extends RuntimeException{
    private static final String DESCRIPTION = "Unprocessable entity (401)";

    public UnprocessableException(String detail){
        super(DESCRIPTION + ". " + detail);
    }
}
