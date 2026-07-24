package com.jyoti.eventmanagement.service;

import com.jyoti.eventmanagement.dto.response.RegistrationResponse;
import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.Registration;
import com.jyoti.eventmanagement.entity.User;
import org.springframework.stereotype.Component;

@Component
public class RegistrationMapper {

    public RegistrationResponse toResponse(Registration registration) {
        Event event = registration.getEvent();
        return RegistrationResponse.builder()
                .registrationId(registration.getId())
                .eventId(event.getId())
                .eventTitle(event.getTitle())
                .eventDate(event.getDate())
                .location(event.getLocation())
                .category(event.getCategory())
                .registeredAt(registration.getRegisteredAt())
                .build();
    }
}
