package com.example.DistributedOrderTracking.service;

import com.example.DistributedOrderTracking.model.Product;
import com.example.DistributedOrderTracking.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Create product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Update product
    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        return productRepository.save(product);
    }

    // Delete product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }}

 
    

