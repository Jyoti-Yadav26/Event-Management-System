package com.jyoti.eventmanagement.dto.response;

import com.jyoti.eventmanagement.entity.enums.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationResponse {

    private Long registrationId;
    private Long eventId;
    private String eventTitle;
    private LocalDate eventDate;
    private String location;
    private EventCategory category;
    private LocalDateTime registeredAt;
}
