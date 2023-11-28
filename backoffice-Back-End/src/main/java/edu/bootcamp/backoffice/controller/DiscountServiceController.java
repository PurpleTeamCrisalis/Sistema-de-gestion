package edu.bootcamp.backoffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.bootcamp.backoffice.model.discoutService.DiscountServiceDto;
import edu.bootcamp.backoffice.service.DiscountServiceImpl;
import java.util.List;

@RestController
@RequestMapping(path = "totaldiscounts")
public class DiscountServiceController {
    @Autowired
    private final DiscountServiceImpl discountServiceImpl;


    public DiscountServiceController(DiscountServiceImpl discountServiceImpl){
        this.discountServiceImpl = discountServiceImpl;
    }

    @GetMapping(path = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DiscountServiceDto>> GetOrderDiscount(){
        List<DiscountServiceDto> result = discountServiceImpl.getTotalDiscountServices();
        return ResponseEntity.ok(result);
    }
}
