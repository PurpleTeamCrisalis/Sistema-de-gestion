package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.taxByOrder.TaxByOrder;
import edu.bootcamp.backoffice.model.user.UserFactory;
import edu.bootcamp.backoffice.repository.TaxByOrderRepository;
import edu.bootcamp.backoffice.repository.UserRepository;
import edu.bootcamp.backoffice.service.Interface.TaxByOrderService;
import edu.bootcamp.backoffice.service.Interface.UserService;
import edu.bootcamp.backoffice.service.Interface.Validator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TaxByOrderServiceImpl implements TaxByOrderService
{
    private final TaxByOrderRepository taxByOrderRepository;

    public TaxByOrderServiceImpl( TaxByOrderRepository taxByOrderRepository )
    {
        this.taxByOrderRepository = taxByOrderRepository;
    }
}
