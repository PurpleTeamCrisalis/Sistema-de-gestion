package edu.bootcamp.backoffice.service.Interface;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;

public interface ChargeService {
    //Declaramos las funciones que van haber en la interfaz
    // -- Crear Impuesto
    public ChargeResponse createCharge(ChargeRequest chargeDTO);

    // // -- Información de impuesto
    // public ChargeResponse get(int id);

    // // -- Modificar impuesto (Debemos crear un UpdateChargeRequest?) 
    // public ChargeResponse update(int id);

    // // -- Eliminar impuesto
    // public ChargeResponse delete(int id);
}
