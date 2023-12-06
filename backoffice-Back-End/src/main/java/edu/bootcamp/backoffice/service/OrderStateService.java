package edu.bootcamp.backoffice.service;
import org.springframework.statemachine.StateMachine;

import edu.bootcamp.backoffice.model.order.*;
public interface  OrderStateService {

	StateMachine<OrderState,OrderStateEvent> cancellOrder(Integer id);
	StateMachine<OrderState,OrderStateEvent> payOrder(Integer id);
}
