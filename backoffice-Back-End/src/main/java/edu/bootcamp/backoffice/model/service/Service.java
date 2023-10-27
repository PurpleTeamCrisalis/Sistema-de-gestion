package edu.bootcamp.backoffice.model.service;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "serviceTable")
public class Service extends Asset {

	@Column(name = "isSpecial", nullable = false)
	private boolean isSpecial;

	@Column(name = "suportCharge", nullable = false)
	private double suportCharge;

	public double suportCharge() {

		double suport = 0;

		if (isSpecial == true) {

			suport += super.getBasePrice();
		}

		return suport;
	}
		

}
