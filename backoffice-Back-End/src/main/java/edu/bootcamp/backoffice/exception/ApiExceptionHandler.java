package edu.bootcamp.backoffice.exception;

import edu.bootcamp.backoffice.exception.custom.EmptyElementException;
import edu.bootcamp.backoffice.exception.custom.NotCreatedException;
import edu.bootcamp.backoffice.exception.custom.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({
            EmptyElementException.class,
            NotCreatedException.class
    })
    @ResponseBody
    public ErrorMessage badRequest(HttpServletRequest request, Exception exception){
        return new ErrorMessage(exception, request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({
            UnauthorizedException.class
    })
    @ResponseBody
    public void unauthorized(){
        //Empty because http in case 401 not support body response
    }

}
