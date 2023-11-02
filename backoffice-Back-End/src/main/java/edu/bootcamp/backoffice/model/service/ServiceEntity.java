package edu.bootcamp.backoffice.model.service;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.asset.Asset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Set;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "serviceTable")
public class ServiceEntity extends Asset {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "isSpecial", nullable = false)
	private boolean isSpecial;

	@Column(name = "suportCharge", nullable = false)
	private double suportCharge;

	@ManyToMany
	@JoinTable(
			name = "taxesByServices",
			joinColumns = @JoinColumn(name = "id"),
			inverseJoinColumns = @JoinColumn(name = "tax_id")
	)
	public Set<Tax> taxes;

/*
	public double suportCharge() {

		double suport = 0;

		if (isSpecial == true) {

			suport += super.getBasePrice();
		}

		return suport;
	}
*/
}
