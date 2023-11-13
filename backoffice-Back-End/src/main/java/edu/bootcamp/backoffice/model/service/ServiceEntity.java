package edu.bootcamp.backoffice.model.service;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.Tax.Tax;
import edu.bootcamp.backoffice.model.asset.Asset;
import edu.bootcamp.backoffice.model.order.Order;
import edu.bootcamp.backoffice.model.orderDetail.serviceDetail.ServiceDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

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
	public List<Tax> taxes = new ArrayList<>();

	@OneToMany(mappedBy = "discountService", fetch = FetchType.LAZY)
	private List<Order> ordersWithDiscount = new ArrayList<>();

	@OneToMany(mappedBy = "service", fetch = FetchType.LAZY)
	private List<ServiceDetail> serviceDetails = new ArrayList<>();

	@Override
	public List<Tax> getAllTaxes() {
		return taxes;
	}

	/*
	 * public double suportCharge() {
	 * 
	 * double suport = 0;
	 * 
	 * if (isSpecial == true) {
	 * 
	 * suport += super.getBasePrice();
	 * }
	 * 
	 * return suport;
	 * }
	 */
}
