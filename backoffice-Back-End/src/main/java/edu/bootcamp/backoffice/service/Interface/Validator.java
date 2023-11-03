package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.SoftDeletable;
import org.springframework.data.jpa.repository.JpaRepository;

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

    public <Entity> Entity validateIdExistence(
            Integer id,
            JpaRepository<Entity, Integer> repository
    );

    public void validateIdFormat(
            Integer id,
            StringBuilder errorBuilder
    );

    public void validateVarchar(
            String varchar,
            Integer minLength,
            Integer maxLength,
            StringBuilder errors,
            String propertyName
    );

    public Boolean isEmpty(
            String varchar,
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
}
