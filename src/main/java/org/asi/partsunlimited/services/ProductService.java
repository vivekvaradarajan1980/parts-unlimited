package org.asi.partsunlimited.services;

import lombok.AllArgsConstructor;
import org.asi.partsunlimited.Product;
import org.asi.partsunlimited.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product)  ;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product updateQuantity(Integer quantity, Long id) {
        var prod = productRepository.getById(id);
        prod.setQuantity(prod.getQuantity()+quantity);

        prod=productRepository.save(prod);

        if(prod.getQuantity()<0)
            throw new OrderingExcessException("you asking too much");
        else
            return prod;

    }
}
