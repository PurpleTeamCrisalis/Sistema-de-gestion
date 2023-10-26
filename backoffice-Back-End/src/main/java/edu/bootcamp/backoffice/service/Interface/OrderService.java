package edu.bootcamp.backoffice.service.Interface;

import java.util.List;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.order.dto.UpdateOrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;

public interface OrderService {
    public OrderResponse registerOrder(OrderRequest createRequest);

    public OrderResponse get(int id);

    public List<OrderResponse> get()
            throws InvalidIdFormatException;

    public OrderResponse update(int id, UpdateOrderRequest OrderDto)
            throws InvalidIdFormatException;

    public OrderResponse delete(int id)
            throws InvalidIdFormatException;

}
