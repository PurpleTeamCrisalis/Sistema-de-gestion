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
            Integer id,
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
            Integer id,
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
            Integer id,
            JpaRepository<Entity, Integer> repository
        )
    {
        Optional<Entity> entity = repository.findById(id);
        if(entity.isEmpty())
            throw new IdNotFountException(" Id not found.");
        return entity.get();
    }

    public <Entity> Entity validateFkExistence(
            Integer id,
            JpaRepository<Entity, Integer> repository,
            StringBuilder errorBuilder
            )
    {
        Optional<Entity> entity = repository.findById(id);
        if(entity.isEmpty())
            errorBuilder
                    .append(" There is no registered element for the Foreign Key ")
                    .append(id)
                    .append(".");
        return entity.orElse(null);
    }

    public void validateIdFormat(
            Integer id,
            StringBuilder errorBuilder
        )
    {
        if(id == null || id<1)
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
        if(longNumber == null)
            errorBuilder.append(
                    " Debe proveerse un valor a " + propertyName + "."
            );
        else if(longNumber>maxStrict )
            errorBuilder.append(
                    " The " + propertyName + " must be smaller than " + maxStrict +  "."
            );
        else if(longNumber<minStrict)
            errorBuilder.append(
                    " The " + propertyName + " must be grater than " + minStrict +  "."
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
        if(integerNumber == null)
            errorBuilder.append(
                    " There is no value for " + propertyName + "."
            );
        else if(integerNumber<minStrict )
            errorBuilder.append(
                    " The " + propertyName + " must be greater than " + minStrict +  "."
            );
        else if(integerNumber>maxStrict)
            errorBuilder.append(
                    " The " + propertyName + " must be smaller than " + maxStrict +  "."
            );
    }

    @Override
    public void validateFloatValue(Float longNumber, Integer maxStrict, Integer minStrict, String propertyName, StringBuilder errorBuilder) {
        if(longNumber == null)
            errorBuilder.append(
                    " Debe proveerse un valor a " + propertyName + "."
            );
        else if(longNumber>maxStrict )
            errorBuilder.append(
                    " The " + propertyName + " must be smaller than " + maxStrict +  "."
            );
        else if(longNumber<minStrict)
            errorBuilder.append(
                    " The " + propertyName + " must be grater than " + minStrict +  "."
            );
    }

    public void validateVarchar(
            String varchar,
            Integer minLength,
            Integer maxLength,
            StringBuilder errors,
            String propertyName
        )
    {
        StringBuilder newErrors = new StringBuilder();
        if( ! isEmpty(varchar, newErrors, propertyName) )
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
            StringBuilder errors,
            String propertyName
        )
    {
        if(isNull(varchar, errors, propertyName))
            return Boolean.TRUE;
        if ( varchar.isEmpty() )
        {
            errors.append(" " + propertyName + " has no content.");
            return Boolean.TRUE;
        }
        return  Boolean.FALSE;
    }

    @Override
    public Boolean isNull(
            Object obj,
            StringBuilder errors,
            String propertyName
        )
    {
        if (obj == null)
        {
            errors.append(" " + propertyName + " has no value.");
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