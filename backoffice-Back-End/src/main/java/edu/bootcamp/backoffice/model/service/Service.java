package edu.bootcamp.backoffice.model.service;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.asset.Asset;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "serviceTable")
public class Service extends Asset {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

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
