package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.product.Product;
import edu.bootcamp.backoffice.model.product.dto.ProductRequest;
import edu.bootcamp.backoffice.model.product.dto.ProductResponse;
import edu.bootcamp.backoffice.model.product.dto.UpdateProductRequest;

public interface ProductService {
        public ProductResponse registerProduct(ProductRequest productDto);

        public ProductResponse get(int id);

        public List<ProductResponse> get()
                        throws InvalidIdFormatException;

        public ProductResponse update(int id, UpdateProductRequest productDto)
                        throws InvalidIdFormatException;

        public ProductResponse delete(int id)
                        throws InvalidIdFormatException;

        public Product getProductById(
                Integer id,
                StringBuilder errorBuilder
        );
}
