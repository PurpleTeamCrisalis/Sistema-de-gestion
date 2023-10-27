package edu.bootcamp.backoffice.service.validators;

import edu.bootcamp.backoffice.exception.custom.dbValidation.IdNotFountException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ValidatorImpl implements Validator
{
    public <Entity extends SoftDeletable> Entity validateSoftDeletableEntityExistence(
            int id,
            JpaRepository<Entity, Integer> repository
        )
    {
        Entity entity = completeValidationForId(id, repository);
        if(entity.isDeleted())
            throw new IdNotFountException(
                    " Not found, the element was previously deleted");
        return entity;
    }

    public <Entity> Entity completeValidationForId(
            int id,
            JpaRepository<Entity, Integer> repository
        )
    {
        StringBuilder errorBuilder = new StringBuilder();
        validateIdFormat(id, errorBuilder);
        if(errorBuilder.length()>0)
            throw new InvalidIdFormatException(errorBuilder.toString());
        return validateIdExistence(id, repository);
    }

    public <Entity> Entity validateIdExistence(
            int id,
            JpaRepository<Entity, Integer> repository
        )
    {
        Optional<Entity> entity = repository.findById(id);
        if(entity.isEmpty())
            throw new IdNotFountException(" Id not found");
        return entity.get();
    }

    public void validateIdFormat(
            int id,
            StringBuilder errorBuilder
        )
    {
        if(id<1)
            errorBuilder.append(
                    " The id must be grater than 0."
            );
    }
    /** Validate Interger */
    public void validateInterge(
        Integer integer,
        int minLength,
            int maxLength,
            StringBuilder errors,
            String propertyName
    ){
        StringBuilder newErrors = new StringBuilder();
        if( ! isValueMax(integer, maxLength, newErrors))            
            if(isValueMin(integer, minLength, newErrors));
            
        if(newErrors.length() != 0)
            errors
                    .append("| ")
                    .append(propertyName)
                    .append(" :")
                    .append(newErrors);
    }
    
    public Boolean isValueMax(
            Integer integer,
            Integer maxLength,
            StringBuilder errors
        )
    {
        if (integer > maxLength)
        {
            errors
                    .append(" Exceeds ")
                    .append(maxLength)
                    .append(" value.");
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean isValueMin(
            Integer integer,
            Integer minLength,
            StringBuilder errors
        )
    {
        if (integer < minLength)
        {
            errors
                    .append(" Exceeds ")
                    .append(minLength)
                    .append(" value.");
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
    /** Validate Interger */

    public void validateVarchar(
            String varchar,
            int minLength,
            int maxLength,
            StringBuilder errors,
            String propertyName
        )
    {
        StringBuilder newErrors = new StringBuilder();
        if( ! isEmpty(varchar, newErrors) )
            if ( ! isLonger(varchar, maxLength, newErrors))
                isShorter(varchar, minLength, newErrors);
        if(newErrors.length() != 0)
            errors
                    .append("| ")
                    .append(propertyName)
                    .append(" :")
                    .append(newErrors);
    }

    public Boolean isEmpty(
            String varchar,
            StringBuilder errors
        )
    {
        if (varchar == null || varchar.isEmpty())
        {
            errors.append(" It has no content.");
            return Boolean.TRUE;
        }
        return  Boolean.FALSE;
    }

    public Boolean isLonger(
            String varchar,
            Integer maxLength,
            StringBuilder errors
        )
    {
        if (varchar.length() > maxLength)
        {
            errors
                    .append(" Exceeds ")
                    .append(maxLength)
                    .append(" characters.");
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean isShorter(
            String varchar,
            Integer minLength,
            StringBuilder errors
        )
    {
        if (varchar.length() < minLength)
        {
            errors
                    .append(" Is less than ")
                    .append(minLength)
                    .append(" characters.");
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}