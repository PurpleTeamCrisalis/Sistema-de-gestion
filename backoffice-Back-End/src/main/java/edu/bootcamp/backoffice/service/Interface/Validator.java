package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.SoftDeletable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface Validator
{
    public  <Entity extends SoftDeletable> Entity validateSoftDeletableEntityExistence(
            int id,
            JpaRepository<Entity, Integer> repository
    );

    public <Entity> Entity completeValidationForId(
            int id,
            JpaRepository<Entity, Integer> repository
        );

    public <Entity> Entity validateIdExistence(
            int id,
            JpaRepository<Entity, Integer> repository
    );

    public void validateIdFormat(
            int id,
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

    public void validateVarchar(
            String varchar,
            int minLength,
            int maxLength,
            StringBuilder errors,
            String propertyName
    );

    public Boolean isEmpty(
            String varchar,
            StringBuilder errors
    );

    public Boolean isEmpty(
            Long longNumber,
            StringBuilder errors
    );

    public Boolean isEmpty(
            Integer intNumber,
            StringBuilder errors
    );

    public Boolean isEmpty(
            Boolean flag,
            StringBuilder errors
    );

    public Boolean isEmpty(
            Date date,
            StringBuilder errors
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

    public Boolean isLonger(
            Long longNumber,
            Long maxLength,
            StringBuilder errors
    );

    public Boolean isShorter(
            Long longNumber,
            Long minLength,
            StringBuilder errors
    );

    public Boolean isLonger(
            Integer intNumber,
            Integer maxLength,
            StringBuilder errors
    );

    public Boolean isShorter(
            Integer intNumber,
            Integer minLength,
            StringBuilder errors
    );
}
