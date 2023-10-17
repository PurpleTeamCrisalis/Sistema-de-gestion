package edu.bootcamp.backoffice.exception.custom.parameterValidation;

public class EmptyElementException extends IllegalArgumentException
{
    private static final String DESCRIPTION = "Empty element (400)";

    public EmptyElementException(String detail){
        super(DESCRIPTION + ". " + detail);
    }

}
