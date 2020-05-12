package com.onlinepizza.portal.mail;

public interface EmailService {
    void sendSimpleMessage(String to,
                           String subject,
                           String text);
}
