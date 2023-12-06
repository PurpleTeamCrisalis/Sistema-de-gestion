package edu.bootcamp.backoffice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:app-constants.properties")
public class AppConstants {

    @Value("${productDiscountFactor}")
    private double productDiscountFactor;

    @Value("${maxOrderDiscount}")
    private double maxOrderDiscount;

    @Value("${yearWarrantyFactor}")
    private double yearWarrantyFactor;

    public double getDiscountFactor() {
        return productDiscountFactor;
    }

    public double getMaxOrderDiscount() {
        return maxOrderDiscount;
    }

    public double getYearWarrantyFactor() {
        return yearWarrantyFactor;
    }
}
