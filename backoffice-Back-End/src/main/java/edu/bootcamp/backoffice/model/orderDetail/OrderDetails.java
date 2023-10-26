// package edu.bootcamp.backoffice.model.orderDetail;

// import javax.persistence.*;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @Entity
// @NoArgsConstructor
// @AllArgsConstructor
// @Table(name = "orderDetailsTable")
// @Builder
// public class OrderDetails {
// @Id
// @Column(name = "id")
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Integer id;

// @Column(name = "basePrice", nullable = false)
// private Float basePrice;

// @Column(name = "taxesApplied", nullable = false)
// private String taxesApplied;

// @Column(name = "taxCharges", nullable = false)
// private Float taxCharges;

// @Column(name = "subTotal", nullable = false)
// private Float subTotal;
// }
