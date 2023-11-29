package edu.bootcamp.backoffice.controller;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.bootcamp.backoffice.model.order.dto.OrderRequest;
import edu.bootcamp.backoffice.model.order.dto.OrderResponse;
import edu.bootcamp.backoffice.security.JWTGenerator;
import edu.bootcamp.backoffice.service.OrderStateService;
import edu.bootcamp.backoffice.service.Interface.OrderService;

@RestController
@RequestMapping(path = "order")
public class OrderController {

  private final OrderService orderService;
  private final OrderStateService orderStateService;

  @Autowired
  public OrderController(OrderService orderService, OrderStateService orderStateService) {
    this.orderService = orderService;
    this.orderStateService=orderStateService;
  }

  @PostMapping(
          path = "",
          consumes = MediaType.APPLICATION_JSON_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
    )
  public ResponseEntity<OrderResponse> registerOrder(
         // HttpServletRequest request,
          @RequestBody OrderRequest createRequest
  )
  {/*
    String token = request.getHeader("Authorization");
    String username = JWTGenerator.getUsernameFromJWT(
            token.replace("Bearer ", ""));*/
    String username = "admin";
    OrderResponse orderDto = orderService.registerOrder(createRequest, username);
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(orderDto.getId())
        .toUri();

    return ResponseEntity.created(location).body(orderDto);
  }

  @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<OrderResponse> getOrder(@PathVariable int id) {
    OrderResponse order = orderService.get(id);
    return ResponseEntity.ok(order);
  }

  @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<OrderResponse>> getAllOrders() {
    List<OrderResponse> orders = orderService.get();
    return ResponseEntity.ok(orders);
  }

  @GetMapping(value = "list/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<OrderResponse>> getAllClientOrders(@PathVariable int clientId) {
    List<OrderResponse> orders = orderService.getClientOrders(clientId);
    return ResponseEntity.ok(orders);
  }

  @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<OrderResponse> deleteOrder(@PathVariable int id) {
    OrderResponse order = orderService.delete(id);
    return ResponseEntity.ok(order);
  }
  
  @PatchMapping(path = "cancelOrderState/{id}" )
	public ResponseEntity updateOrder(@PathVariable int id
			) {
		 orderStateService.cancellOrder(id);
		return ResponseEntity.ok("ORDER_CANCELLED");
	}
	
	@PatchMapping(path = "payOrderState/{id}" )
	public ResponseEntity updateOrderPayed(@PathVariable int id
			) {
		 orderStateService.payOrder(id);
		return ResponseEntity.ok("ORDER_DELIVERED");
	}
}
