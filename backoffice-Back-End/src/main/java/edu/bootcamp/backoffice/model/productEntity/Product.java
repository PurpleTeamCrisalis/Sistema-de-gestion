package edu.bootcamp.backoffice.model.productEntity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import edu.bootcamp.backoffice.model.productDetail.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
@Builder
public class Product {
  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
  private List<ProductDetail> productDetails = new ArrayList<>();
}
