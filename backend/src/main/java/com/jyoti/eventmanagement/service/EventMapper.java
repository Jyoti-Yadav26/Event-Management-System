package com.jyoti.eventmanagement.service;

import com.jyoti.eventmanagement.dto.request.EventRequest;
import com.jyoti.eventmanagement.dto.response.EventResponse;
import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.User;
import com.jyoti.eventmanagement.entity.enums.EventCategory;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {

    public EventResponse toResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .category(event.getCategory())
                .date(event.getDate())
                .time(event.getTime())
                .location(event.getLocation())
                .maxSeats(event.getMaxSeats())
                .availableSeats(event.getAvailableSeats())
                .organizerId(event.getOrganizer().getId())
                .organizerName(event.getOrganizer().getName())
                .createdAt(event.getCreatedAt())
                .build();
    }

    public Event toEntity(EventRequest request, User organizer) {
        return Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .date(request.getDate())
                .time(request.getTime())
                .location(request.getLocation())
                .maxSeats(request.getMaxSeats())
                .availableSeats(request.getMaxSeats())
                .organizer(organizer)
                .build();
    }

    public void updateEntity(Event event, EventRequest request) {
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setCategory(request.getCategory());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setLocation(request.getLocation());
        event.setMaxSeats(request.getMaxSeats());
    }
}
