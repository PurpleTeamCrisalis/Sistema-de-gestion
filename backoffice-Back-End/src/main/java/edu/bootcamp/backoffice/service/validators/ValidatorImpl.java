package edu.bootcamp.backoffice.service.validators;

import edu.bootcamp.backoffice.exception.custom.dbValidation.IdNotFountException;
import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Date;
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

    public void validateLongValue(
            Long longNumber,
            Long maxStrict,
            Long minStrict,
            String propertyName,
            StringBuilder errorBuilder
    )
    {
        if(longNumber<minStrict )
            errorBuilder.append(
                    " The " + propertyName + " must be greater than " + minStrict +  "."
            );
        else if(longNumber>maxStrict)
            errorBuilder.append(
                    " The " + propertyName + " must be smaller than " + maxStrict +  "."
            );
    }

    public void validateIntegerValue(
            Integer integerNumber,
            Integer maxStrict,
            Integer minStrict,
            String propertyName,
            StringBuilder errorBuilder
    )
    {
        if(integerNumber<minStrict )
            errorBuilder.append(
                    " The " + propertyName + " must be greater than " + minStrict +  "."
            );
        else if(integerNumber>maxStrict)
            errorBuilder.append(
                    " The " + propertyName + " must be smaller than " + maxStrict +  "."
            );
    }

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

    @Override
    public Boolean isEmpty(
            Boolean flag,
            StringBuilder errors)
    {
        if (flag == null)
        {
            errors.append(" It has no content.");
            return Boolean.TRUE;
        }
        return  Boolean.FALSE;
    }

    @Override
    public Boolean isEmpty(
            Date date,
            StringBuilder errors)
    {
        if (date == null)
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
                    .append(" Must be greater than ")
                    .append(minLength)
                    .append(" characters.");
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

}