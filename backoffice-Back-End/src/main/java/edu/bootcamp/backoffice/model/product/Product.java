package edu.bootcamp.backoffice.model.product;

import javax.persistence.Entity;
import javax.persistence.Table;

import edu.bootcamp.backoffice.model.asset.Asset;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity

@Table(name = "productTable")
public class Product extends Asset {

}
