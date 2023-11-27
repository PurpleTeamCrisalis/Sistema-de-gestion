package edu.bootcamp.backoffice.service;

import java.util.Optional;

import org.springframework.messaging.Message;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.support.StateMachineInterceptorAdapter;
import org.springframework.statemachine.transition.Transition;
import org.springframework.stereotype.Component;

import edu.bootcamp.backoffice.model.order.*;
import edu.bootcamp.backoffice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OrderStateChangeInterceptor extends StateMachineInterceptorAdapter<OrderState, OrderStateEvent> {

	private final OrderRepository orderRepository;
	private static Integer orderId;

	@Override
	public void preStateChange(State<OrderState, OrderStateEvent> state, Message<OrderStateEvent> message,
			Transition<OrderState, OrderStateEvent> transition, StateMachine<OrderState, OrderStateEvent> stateMachine,
			StateMachine<OrderState, OrderStateEvent> rootStateMachine) {
		// TODO Auto-generated method stub
		Optional.ofNullable(message).ifPresent(msg -> {
			Optional.ofNullable(
					Integer.class.cast(msg.getHeaders().getOrDefault(OrderServiceImpl.ORDER_ID_HEADER, orderId)))
					.ifPresent(id -> {
						Order order = orderRepository.getOne(id);
						order.setOrderState(state.getId());
						orderRepository.save(order);
					});
		});
	}

	public static void setOrderId(Integer orderId) {
		OrderStateChangeInterceptor.orderId = orderId;
	}

}
