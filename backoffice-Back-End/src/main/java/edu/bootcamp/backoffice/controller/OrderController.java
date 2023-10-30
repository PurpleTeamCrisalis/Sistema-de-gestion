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
import edu.bootcamp.backoffice.service.Interface.OrderService;

@RestController
@RequestMapping(path = "order")
public class OrderController {

  private final OrderService orderService;

  @Autowired
  public OrderController(OrderService orderService) {
    this.orderService = orderService;
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
  {
    // String token = request.getHeader("Authorization");
    // String username = JWTGenerator.getUsernameFromJWT(token);
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

  // @PatchMapping(value = "update/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  // public ResponseEntity<OrderResponse> updateOrder(
  //     @PathVariable int id,
  //     @RequestBody UpdateOrderRequest orderDTO) {
  //   OrderResponse order = orderService.update(id, orderDTO);
  //   return ResponseEntity.ok(order);
  // }

  @DeleteMapping(value = "delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<OrderResponse> deleteOrder(@PathVariable int id) {
    OrderResponse order = orderService.delete(id);
    return ResponseEntity.ok(order);
  }
}
