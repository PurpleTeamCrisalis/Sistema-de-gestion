package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class IdNotFountException extends RuntimeException
{

    private static final String DESCRIPTION = "Id not found (404)";

    public IdNotFountException(String detail){
        super(DESCRIPTION + ". " + detail);
    }

}
