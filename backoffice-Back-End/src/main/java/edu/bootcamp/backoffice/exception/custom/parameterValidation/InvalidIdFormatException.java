package edu.bootcamp.backoffice.exception.custom.parameterValidation;

public class InvalidIdFormatException extends IllegalArgumentException
{
    private static final String DESCRIPTION = "Invalid id format (400)";

    public InvalidIdFormatException(String detail){
        super(DESCRIPTION + ". " + detail);
    }
}
