package edu.bootcamp.backoffice.service.Interface;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.model.Charge.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Charge.dto.ChargeResponse;
import java.util.List;

public interface ChargeService {
    //Declaramos las funciones que van haber en la interfaz
    // -- Crear Impuesto
    public ChargeResponse createCharge(ChargeRequest chargeDTO);

    // -- Obteniendo TODOS los registros
    public List<ChargeResponse> get();

    // -- Obteniendo un registro
    public ChargeResponse get(int id);

    // // -- Modificar impuesto (Debemos crear un UpdateChargeRequest?) 
    // public ChargeResponse update(int id);

    // -- Eliminar impuesto
    public ChargeResponse delete(int id);
}
