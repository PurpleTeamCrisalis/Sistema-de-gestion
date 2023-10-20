package edu.bootcamp.backoffice.exception.custom.parameterValidation;

public class InvalidArgumentsFormatException extends RuntimeException
{
    private static final String DESCRIPTION =
            "Invalid arguments format (400)";

    public InvalidArgumentsFormatException(String detail){
        super(DESCRIPTION + "." + detail);
    }
}
