package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class AlreadyRegisteredException extends RuntimeException{

    private static final String DESCRIPTION = "Already registered (409)";

    public AlreadyRegisteredException(String detail){
        super(DESCRIPTION + ". " + detail);
    }

}