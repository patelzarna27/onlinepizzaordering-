package com.onlinepizza.portal.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Random;

public class Helper {

    @Autowired
    JavaMailSender javaMailSender;

    public static long generateId(String strId)
    {
        StringBuilder sb = new StringBuilder();
        char[] letters = strId.toCharArray();
        for (char ch : letters) {
            int ascii  = (int) ch;
            sb.append(ascii);
        }
        return Long.parseLong(sb.toString());
    }

    public static long generateId()
    {
        Random random = new Random();
        // generate a random integer from 0 to 899, then add 100
        int x = random.nextInt(900) + 100;
        return Long.parseLong(String.valueOf(x));
    }

    public void sendEmail(String toEmail, String strMessage,String subject){

       javaMailSender = new JavaMailSenderImpl();

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toEmail);

        msg.setSubject(subject);
        msg.setText(strMessage);

        javaMailSender.send(msg);
    }
}
