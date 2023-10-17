package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class InvalidCredentialsException extends RuntimeException
{
    private static final String DESCRIPTION = "Invalid Credentials (401)";

    public InvalidCredentialsException(String detail){
        super(DESCRIPTION + ". " + detail);
    }
}
