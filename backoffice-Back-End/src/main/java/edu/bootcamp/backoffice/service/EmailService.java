package edu.bootcamp.backoffice.service;

import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Objects;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final Environment environment;

    public EmailService(JavaMailSender javaMailSender, Environment environment) {
        this.javaMailSender = javaMailSender;
        this.environment = environment;
    }

    public void sendNewPassword(String newPass, String email) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
        try {
            helper.setFrom(Objects.requireNonNull(environment.getProperty("spring.mail.username")));
            helper.setTo(email);
            helper.setSubject("Recuperación de Contraseña - Importante");
            String content = "<html><body>" +
                    "<p>Estimado Usuario,</p>" +
                    "<p>Hemos recibido una solicitud de recuperación de contraseña para su cuenta. Se ha generado una nueva credencial.</p>" +
                    "<br/>"+
                    "<p>Su nueva contraseña es: <b>" + newPass + "</b></p>" +
                    "<br/>"+
                    "<p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en contactarnos.</p>" +
                    "<br/><br/>"+
                    "<p><i>Este es un correo electrónico automático. Por favor, no responda a este mensaje.</i></p>" +
                    "</body></html>";
            helper.setText(content,true);
            javaMailSender.send(message);
        }catch(Exception e){

        }
    }
}
