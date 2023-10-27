package edu.bootcamp.backoffice.model.asset;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.EntitiesConstraints;
import edu.bootcamp.backoffice.model.SoftDeletable;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor

public abstract class Asset implements SoftDeletable {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false, length = EntitiesConstraints.USERNAME_MAX_LENGTH)
	private String name;

	@Column(name = "description", nullable = false, length = EntitiesConstraints.DESCRIPTION_MAX_LENGTH)
	private String description;

	@Column(name = "basePrice", nullable = false)
	private double basePrice;

	@Column(name = "enabled", nullable = false)
	private boolean enabled = true;

	// private List<Tax> taxs = new ArrayList<>();

	public Boolean isDeleted() {
		return !enabled;
	}

	public Boolean isNotDeleted() {
		return enabled;
	}
}