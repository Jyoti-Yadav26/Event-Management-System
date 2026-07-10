package com.jyoti.eventmanagement.dto.response;

import com.jyoti.eventmanagement.entity.enums.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private EventCategory category;
    private LocalDate date;
    private LocalTime time;
    private String location;
    private Integer maxSeats;
    private Integer availableSeats;
    private Long organizerId;
    private String organizerName;
    private LocalDateTime createdAt;
}
