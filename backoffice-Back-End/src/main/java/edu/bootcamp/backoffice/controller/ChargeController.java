package edu.bootcamp.backoffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import edu.bootcamp.backoffice.service.Interface.ChargeService;

import java.net.URI;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping(path="/charge")
public class ChargeController {
    private final ChargeService chargeService;
    @Autowired
    public ChargeController(ChargeService chargeService){
        this.chargeService = chargeService;
    }

    @PostMapping(
        path = "/create",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> createCharge(@RequestBody ChargeRequest createRequest){
        ChargeResponse chargeDTO = chargeService.createCharge(createRequest);
        
        //URI de Informacion para el cliente [Header] 
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(chargeDTO.getId())
            .toUri();
    
        //         .created() nos da el status code: 201
        return ResponseEntity.created(location).body(chargeDTO);
    }

    // @DeleteMapping(
    //     value = "delete/{id}",
    //     produces =  MediaType.APPLICATION_JSON_VALUE
    // )
    // public ResponseEntity<ChargeResponse> deleteCharge(@PathVariable id){
    //     ChargeResponse charge = use
    // }
}
