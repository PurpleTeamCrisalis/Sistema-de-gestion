package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.SoftDeletable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface Validator
{
    public  <Entity extends SoftDeletable> Entity validateSoftDeletableEntityExistence(
            Integer id,
            JpaRepository<Entity, Integer> repository
    );

    public <Entity> Entity completeValidationForId(
            Integer id,
            JpaRepository<Entity, Integer> repository
        );

    public <Entity> Entity validateFkExistence(
            Integer id,
            JpaRepository<Entity, Integer> repository,
            StringBuilder errorBuilder
    );

    public <Entity> Entity validateIdExistence(
            Integer id,
            JpaRepository<Entity, Integer> repository
    );

    public void validateIdFormat(
            Integer id,
            StringBuilder errorBuilder
    );

    public void validateLongValue(
            Long longNumber,
            Long maxStrict,
            Long minStrict,
            String propertyName,
            StringBuilder errorBuilder
    );

    public void validateIntegerValue(
            Integer longNumber,
            Integer maxStrict,
            Integer minStrict,
            String propertyName,
            StringBuilder errorBuilder
    );

    public void validateFloatValue(
            Float longNumber,
            Integer maxStrict,
            Integer minStrict,
            String propertyName,
            StringBuilder errorBuilder
    );

    public void validateVarchar(
            String varchar,
            Integer minLength,
            Integer maxLength,
            StringBuilder errors,
            String propertyName
    );

    /*public void validateInterger(
            Integer integer,
            int minLength,
            int maxLength,
            StringBuilder errors,
            String propertyName
    );*/

    public Boolean isEmpty(
            String varchar,
            StringBuilder errors,
            String propertyName
    );

    public Boolean isNull(
            Object obj,
            StringBuilder errors,
            String propertyName
    );

    public Boolean isLonger(
            String varchar,
            Integer maxLength,
            StringBuilder errors
    );

    public Boolean isShorter(
            String varchar,
            Integer minLength,
            StringBuilder errors
    );

}
