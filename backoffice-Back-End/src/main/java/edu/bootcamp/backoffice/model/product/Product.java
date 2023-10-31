package edu.bootcamp.backoffice.model.product;

import javax.persistence.Entity;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "productTable")
public class Product extends Asset {

}
