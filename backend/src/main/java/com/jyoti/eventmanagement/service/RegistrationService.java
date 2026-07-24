package com.jyoti.eventmanagement.service;

import com.jyoti.eventmanagement.dto.response.RegistrationResponse;
import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.Registration;
import com.jyoti.eventmanagement.entity.User;
import com.jyoti.eventmanagement.entity.enums.Role;
import com.jyoti.eventmanagement.exception.AlreadyRegisteredException;
import com.jyoti.eventmanagement.exception.EventFullException;
import com.jyoti.eventmanagement.exception.RegistrationClosedException;
import com.jyoti.eventmanagement.exception.RegistrationNotFoundException;
import com.jyoti.eventmanagement.exception.ResourceNotFoundException;
import com.jyoti.eventmanagement.exception.UnauthorizedAccessException;
import com.jyoti.eventmanagement.repository.EventRepository;
import com.jyoti.eventmanagement.repository.RegistrationRepository;
import com.jyoti.eventmanagement.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final RegistrationMapper registrationMapper;
    private final SecurityUtils securityUtils;

    @Transactional
    public RegistrationResponse registerForEvent(Long eventId) {
        User attendee = securityUtils.getCurrentUser();
        verifyAttendeeRole(attendee);

        Event event = findEventById(eventId);
        validateRegistrationOpen(event);
        validateNotAlreadyRegistered(attendee, event);
        validateSeatsAvailable(event);

        Registration registration = Registration.builder()
                .user(attendee)
                .event(event)
                .build();

        Registration savedRegistration = registrationRepository.save(registration);
        event.setAvailableSeats(event.getAvailableSeats() - 1);

        return registrationMapper.toResponse(savedRegistration);
    }

    @Transactional
    public void cancelRegistration(Long eventId) {
        User attendee = securityUtils.getCurrentUser();
        verifyAttendeeRole(attendee);

        Event event = findEventById(eventId);
        Registration registration = registrationRepository.findByUserAndEvent(attendee, event)
                .orElseThrow(() -> new RegistrationNotFoundException(
                        "Registration not found for event id: " + eventId));

        registrationRepository.delete(registration);
        event.setAvailableSeats(Math.min(event.getMaxSeats(), event.getAvailableSeats() + 1));
    }

    @Transactional(readOnly = true)
    public List<RegistrationResponse> getMyRegistrations() {
        User attendee = securityUtils.getCurrentUser();
        verifyAttendeeRole(attendee);

        return registrationRepository.findByUser(attendee).stream()
                .map(registrationMapper::toResponse)
                .toList();
    }

    private Event findEventById(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));
    }

    private void verifyAttendeeRole(User user) {
        if (user.getRole() != Role.ATTENDEE) {
            throw new UnauthorizedAccessException("Only attendees can register for events");
        }
    }

    private void validateRegistrationOpen(Event event) {
        if (event.getDate().isBefore(LocalDate.now())) {
            throw new RegistrationClosedException("Registration is closed — event date has passed");
        }
    }

    private void validateNotAlreadyRegistered(User user, Event event) {
        if (registrationRepository.existsByUserAndEvent(user, event)) {
            throw new AlreadyRegisteredException("You are already registered for this event");
        }
    }

    private void validateSeatsAvailable(Event event) {
        if (event.getAvailableSeats() <= 0) {
            throw new EventFullException("Event is full — no seats available");
        }
    }
}
