package com.example.demo;


        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.beans.factory.annotation.Value;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.stereotype.Controller;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.Valid;
        import java.util.List;
        import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/api/v1")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;
    private Products products;
//
//    @Value("${server.port}")
//    private int serverPort;

    @GetMapping("/view")
    public List<Products> getAllProductDetails (){
        return productRepository.findAll();
    }

//    @GetMapping("/health")
//    public String healthcheck(){
//        return "<h1><u>I am running on port =><b>" + serverPort+"</b></u><h1>";
//    }

    @PostMapping("/add")
    public Products addYourProductDetails(@Valid @RequestBody Products products) {
        return productRepository.save(products);
    }
    //    @GetMapping("/{sold}")
//    public List<Products> getAllProductSold (@PathVariable String sold){
//        return productRepository.findSold(sold);
//    }
    @GetMapping("/{id}")
    public Optional<Products> getProductDetailsById(@PathVariable Long id) {
        Optional<Products> products =  productRepository.findById(id);
        return products;
    }
    @DeleteMapping("/{id}")
    public String deleteProductDetails (@PathVariable Long id) {
        productRepository.deleteById(id);
        if(products!=null) {
            return "Product Not Deleted!";
        }
        return "Product Deleted!";
    }
    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProductAvailability (@PathVariable Long id, @RequestBody Products products) throws ResourceNotFoundException {
        Products product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No such Id found"));
        product.setAvailable(products.getAvailable());
        Products newProductDetails = productRepository.save(product);
        return new ResponseEntity<Products>(newProductDetails, HttpStatus.OK);
    }
}
