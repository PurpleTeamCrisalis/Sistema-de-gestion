package edu.bootcamp.backoffice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application-local.properties")
public class LocalPropertiesConfig {
}
