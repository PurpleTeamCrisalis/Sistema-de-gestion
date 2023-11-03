package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.model.Tax.dto.ChargeRequest;
import edu.bootcamp.backoffice.model.Tax.dto.ChargeResponse;
import edu.bootcamp.backoffice.model.Tax.dto.UpdateChargeRequest;

public interface TaxService {
    //Declaramos las funciones que van haber en la interfaz
    // -- Crear Impuesto
    public ChargeResponse createCharge(ChargeRequest chargeDTO);

    // -- Obteniendo TODOS los registros
    public List<ChargeResponse> get();

    // -- Obteniendo un registro
    public ChargeResponse get(int id);

    // -- Modificar impuesto (Debemos crear un UpdateChargeRequest?) 
    public ChargeResponse update(int id, UpdateChargeRequest chargeDto);

    // -- Eliminar impuesto
    public ChargeResponse delete(int id);
}
