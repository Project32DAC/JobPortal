package com.app.service;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail,
                                String body,
                                String subject) {
    	
    	System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&In mail sending method&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("jobportalproject32@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("Job notification mail successfully send to employee...");
    }
}