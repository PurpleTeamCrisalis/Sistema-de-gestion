package edu.bootcamp.backoffice.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendNewPassword(String newPass, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("recovery.backoffice.crisalis@gmail.com");
        message.setTo(email);
        message.setSubject("Recuperación de Contraseña");
        message.setText("Este correo electrónico se envía de forma automática al recuperar la contraseña. Por favor no conteste este mensaje.");
        message.setText("Tu nueva contraseña es: " + newPass);

        javaMailSender.send(message);
    }
}
