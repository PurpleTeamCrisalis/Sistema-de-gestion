package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class UnregisteredException extends RuntimeException
{
    private static final String DESCRIPTION = "Unregistered ID (400)";

    public UnregisteredException(String detail){
        super(DESCRIPTION + ". " + detail);
    }
}
