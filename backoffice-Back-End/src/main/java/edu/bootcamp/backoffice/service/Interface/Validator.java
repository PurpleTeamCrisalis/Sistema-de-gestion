package edu.bootcamp.backoffice.service.Interface;

import edu.bootcamp.backoffice.model.SoftDeletable;
import org.springframework.data.jpa.repository.JpaRepository;

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

    public void validateVarchar(
            String varchar,
            int minLength,
            int maxLength,
            StringBuilder errors,
            String propertyName
    );

    public void validateInterge(
            Integer integer,
            int minLength,
            int maxLength,
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
