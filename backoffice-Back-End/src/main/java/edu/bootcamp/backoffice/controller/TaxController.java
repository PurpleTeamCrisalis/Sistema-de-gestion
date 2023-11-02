package edu.bootcamp.backoffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Tax.dto.UpdateChargeRequest;
import edu.bootcamp.backoffice.service.Interface.TaxService;

import java.net.URI;
import java.util.List;



@RestController
@RequestMapping(path="/charge")
public class TaxController {
    private final TaxService taxService;
    @Autowired
    public TaxController(TaxService taxService){
        this.taxService = taxService;
    }

    @PostMapping(
        path = "/create",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> createCharge(@RequestBody ChargeRequest createRequest){
        ChargeResponse chargeDTO = taxService.createCharge(createRequest);
        
        //URI de Informacion para el cliente [Header] 
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(chargeDTO.getId())
            .toUri();
    
        //         .created() nos da el status code: 201
        return ResponseEntity.created(location).body(chargeDTO);
    }

    @DeleteMapping(
        value = "delete/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> deleteCharge(@PathVariable int id){
        ChargeResponse charge = taxService.delete(id);
        return ResponseEntity.ok(charge);
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> getCharge(@PathVariable int id)
    {
        ChargeResponse charge = taxService.get(id);
        return ResponseEntity.ok(charge);
    }

    @PatchMapping(
            path = "update/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> updateCharge(
            @PathVariable int id,
            @RequestBody UpdateChargeRequest chargeDTO)
    {
        ChargeResponse charge = taxService.update(id, chargeDTO);
        return ResponseEntity.ok(charge);
    }

    @GetMapping(
        path="/list",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<ChargeResponse>> getAllCharge(){
        List<ChargeResponse> charges = taxService.get();
        return ResponseEntity.ok(charges);
    }
    
}
