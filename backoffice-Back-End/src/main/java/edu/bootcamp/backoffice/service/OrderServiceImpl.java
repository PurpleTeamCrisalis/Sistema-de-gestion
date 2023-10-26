package edu.bootcamp.backoffice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.bootcamp.backoffice.exception.custom.parameterValidation.InvalidIdFormatException;
import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.model.order.dto.UpdateOrderRequest;
import edu.bootcamp.backoffice.service.Interface.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

  @Override
  public OrderResponse registerOrder(OrderRequest OrderDto) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'registerOrder'");
  }

  @Override
  public OrderResponse get(int id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  @Override
  public List<OrderResponse> get() throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'get'");
  }

  @Override
  public OrderResponse update(int id, UpdateOrderRequest OrderDto) throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'update'");
  }

  @Override
  public OrderResponse delete(int id) throws InvalidIdFormatException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }

}
