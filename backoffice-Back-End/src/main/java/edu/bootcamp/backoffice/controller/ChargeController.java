package edu.bootcamp.backoffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.bootcamp.backoffice.model.Charge.Charge;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Charge.dto.UpdateChargeRequest;
import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.repository.ChargeRepository;
import edu.bootcamp.backoffice.service.Interface.ChargeService;
import io.swagger.models.Response;

import java.net.URI;
import java.util.List;


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

    @DeleteMapping(
        value = "delete/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> deleteCharge(@PathVariable int id){
        ChargeResponse charge = chargeService.delete(id);
        return ResponseEntity.ok(charge);
    }

    @GetMapping(
            value = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ChargeResponse> getCharge(@PathVariable int id)
    {
        ChargeResponse charge = chargeService.get(id);
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
        ChargeResponse charge = chargeService.update(id, chargeDTO);
        return ResponseEntity.ok(charge);
    }

    @GetMapping(
        path="/list",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<ChargeResponse>> getAllCharge(){
        List<ChargeResponse> charges = chargeService.get();
        return ResponseEntity.ok(charges);
    }
    
}
