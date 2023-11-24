package edu.bootcamp.backoffice.model.asset;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.Tax.Tax;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder

// @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
// @DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)       
public abstract class Asset implements SoftDeletable {

	@Column(name = "name", nullable = false, length = EntitiesConstraints.ITEM_NAME_MAX_LENGTH)
	private String name;

	@Column(name = "description", nullable = false, length = EntitiesConstraints.DESCRIPTION_MAX_LENGTH)
	private String description;

	@Column(name = "basePrice", nullable = false)
	private double basePrice;

	@Column(name = "enabled", nullable = false)
	private boolean enabled = true;

	public Boolean isDeleted() {
		return !enabled;
	}

	public Boolean isNotDeleted() {
		return enabled;
	}

	public abstract List<Tax> getAllTaxes();

}