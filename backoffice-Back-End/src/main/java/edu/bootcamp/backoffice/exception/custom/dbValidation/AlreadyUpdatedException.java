package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class AlreadyUpdatedException extends RuntimeException{

    private static final String DESCRIPTION =
            "The information matches the database, is the same (400)";

    public AlreadyUpdatedException(String detail){
        super(DESCRIPTION + ". " + detail);
    }

}
