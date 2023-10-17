package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class EmptyTableException extends RuntimeException
{
    private static final String DESCRIPTION = "No registered elements (404)";

    public EmptyTableException(String detail){
        super(DESCRIPTION + ". " + detail);
    }
}