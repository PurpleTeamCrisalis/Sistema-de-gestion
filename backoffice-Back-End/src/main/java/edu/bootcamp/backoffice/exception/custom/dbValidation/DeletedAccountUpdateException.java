package edu.bootcamp.backoffice.exception.custom.dbValidation;

public class DeletedAccountUpdateException extends RuntimeException
{
    private static final String DESCRIPTION = "Attempted to modify a deleted account.";

    public DeletedAccountUpdateException(String detail) {
        super(DESCRIPTION + ". " + detail);
    }
}