package edu.bootcamp.backoffice.exception.custom;

public class InvalidIdException extends RuntimeException{

    private static final String DESCRIPTION = "Invalid id (400)";

    public InvalidIdException(String detail){
        super(DESCRIPTION + ". " + detail);
    }

}
