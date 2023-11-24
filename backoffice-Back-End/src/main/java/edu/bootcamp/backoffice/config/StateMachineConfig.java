package edu.bootcamp.backoffice.config;

import java.util.EnumSet;

import org.springframework.context.annotation.Configuration;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.StateMachineConfigurerAdapter;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.listener.StateMachineListenerAdapter;
import org.springframework.statemachine.state.State;

import edu.bootcamp.backoffice.model.order.*;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableStateMachineFactory
@Configuration
public class StateMachineConfig extends StateMachineConfigurerAdapter<OrderState, OrderStateEvent> {
	@Override
	public void configure(StateMachineStateConfigurer<OrderState, OrderStateEvent> states) throws Exception {
		// TODO Auto-generated method stub
		states.withStates().initial(OrderState.PENDIENT_TO_PAY).states(EnumSet.allOf(OrderState.class))
				.end(OrderState.ORDER_DELIVERED).end(OrderState.ORDER_CANCELLED);
	}

	@Override
	public void configure(StateMachineTransitionConfigurer<OrderState, OrderStateEvent> transitions) throws Exception {
		// TODO Auto-generated method stub
		transitions.withExternal().source(OrderState.PENDIENT_TO_PAY).target(OrderState.ORDER_CANCELLED)
				.event(OrderStateEvent.ORDER_CANCELLED).and().withExternal().source(OrderState.PENDIENT_TO_PAY)
				.target(OrderState.ORDER_DELIVERED).event(OrderStateEvent.ORDER_PAYED);
	}

	@Override
	public void configure(StateMachineConfigurationConfigurer<OrderState, OrderStateEvent> config) throws Exception {
		// TODO Auto-generated method stub
		StateMachineListenerAdapter<OrderState, OrderStateEvent> adapter = new StateMachineListenerAdapter<>() {

			@Override
			public void stateChanged(State<OrderState, OrderStateEvent> from, State<OrderState, OrderStateEvent> to) {
				log.info(String.format("stateChanged(from: %s, to: %s)", from, to));
			}

		};

		config.withConfiguration().listener(adapter);
	}

}
