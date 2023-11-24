package edu.bootcamp.backoffice.exception;

import edu.bootcamp.backoffice.exception.custom.dbValidation.*;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.EmptyElementException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidArgumentsFormatException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            EmptyElementException.class,
            InvalidIdFormatException.class,
            InvalidArgumentsFormatException.class,
            IllegalArgumentException.class
    })
    @ResponseBody
    public ErrorMessage badRequest(HttpServletRequest request, Exception exception){
        return new ErrorMessage(exception, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({
            EmptyTableException.class,
            UnregisteredException.class,
            IdNotFountException.class
    })
    @ResponseBody
    public ErrorMessage notFound(HttpServletRequest request, Exception exception){
        return new ErrorMessage(exception, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler({
            AlreadyRegisteredException.class,
            OptimisticLockingFailureException.class
    })
    @ResponseBody
    public ErrorMessage conflict(HttpServletRequest request, Exception exception){
        return new ErrorMessage(exception, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler({
            HttpClientErrorException.UnprocessableEntity.class
    })
    @ResponseBody
    public void unprocessable(){
        //Empty because http in case 401 not support body response
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({
            InvalidCredentialsException.class,
            DeletedAccountUpdateException.class
    })
    @ResponseBody
    public void unauthorized(){
        //Empty because http in case 401 not support body response
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ExceptionHandler({
            AlreadyUpdatedException.class
    })
    @ResponseBody
    public ErrorMessage noContent(HttpServletRequest request, Exception exception){
        return new ErrorMessage(exception, request.getRequestURI());
    }
}
