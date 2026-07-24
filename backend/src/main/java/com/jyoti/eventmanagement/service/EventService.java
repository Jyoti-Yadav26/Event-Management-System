package com.jyoti.eventmanagement.service;

import com.jyoti.eventmanagement.dto.request.EventRequest;
import com.jyoti.eventmanagement.dto.response.EventResponse;
import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.User;
import com.jyoti.eventmanagement.entity.enums.EventCategory;
import com.jyoti.eventmanagement.exception.DuplicateEventException;
import com.jyoti.eventmanagement.exception.EventHasRegistrationsException;
import com.jyoti.eventmanagement.exception.InvalidEventDateException;
import com.jyoti.eventmanagement.exception.InvalidSeatCountException;
import com.jyoti.eventmanagement.exception.ResourceNotFoundException;
import com.jyoti.eventmanagement.exception.UnauthorizedAccessException;
import com.jyoti.eventmanagement.repository.EventRepository;
import com.jyoti.eventmanagement.repository.RegistrationRepository;
import com.jyoti.eventmanagement.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;
    private final EventMapper eventMapper;
    private final SecurityUtils securityUtils;

    @Transactional
    public EventResponse createEvent(EventRequest request) {
        User organizer = securityUtils.getCurrentUser();
        validateEventDate(request.getDate());
        validateDuplicateEvent(organizer, request.getTitle(), request.getDate(), null);

        Event event = eventMapper.toEntity(request, organizer);
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toResponse(savedEvent);
    }

    @Transactional(readOnly = true)
    public Page<EventResponse> getAllEvents(String title, EventCategory category, Pageable pageable) {
        Page<Event> events = findEvents(title, category, pageable);
        return events.map(eventMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public EventResponse getEventById(Long id) {
        Event event = findEventById(id);
        return eventMapper.toResponse(event);
    }

    @Transactional(readOnly = true)
    public Page<EventResponse> getMyEvents(Pageable pageable) {
        User organizer = securityUtils.getCurrentUser();
        return eventRepository.findByOrganizer(organizer, pageable)
                .map(eventMapper::toResponse);
    }

    @Transactional
    public EventResponse updateEvent(Long id, EventRequest request) {
        User currentUser = securityUtils.getCurrentUser();
        Event event = findEventById(id);
        verifyOwnership(event, currentUser);

        validateEventDate(request.getDate());
        validateDuplicateEvent(currentUser, request.getTitle(), request.getDate(), id);
        updateAvailableSeats(event, request.getMaxSeats());

        eventMapper.updateEntity(event, request);
        return eventMapper.toResponse(event);
    }

    @Transactional
    public void deleteEvent(Long id) {
        User currentUser = securityUtils.getCurrentUser();
        Event event = findEventById(id);
        verifyOwnership(event, currentUser);
        validateNoActiveRegistrations(event);
        eventRepository.delete(event);
    }

    private Page<Event> findEvents(String title, EventCategory category, Pageable pageable) {
        boolean hasTitle = title != null && !title.isBlank();
        boolean hasCategory = category != null;

        if (hasTitle && hasCategory) {
            return eventRepository.findByCategoryAndTitleContainingIgnoreCase(category, title.trim(), pageable);
        }
        if (hasTitle) {
            return eventRepository.findByTitleContainingIgnoreCase(title.trim(), pageable);
        }
        if (hasCategory) {
            return eventRepository.findByCategory(category, pageable);
        }
        return eventRepository.findAll(pageable);
    }

    private Event findEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    private void verifyOwnership(Event event, User currentUser) {
        if (!event.getOrganizer().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("You are not authorized to modify this event");
        }
    }

    private void validateNoActiveRegistrations(Event event) {
        long registrationCount = registrationRepository.countByEvent(event);
        if (registrationCount > 0) {
            throw new EventHasRegistrationsException(
                    "Cannot delete event — " + registrationCount + " active registration(s) exist. "
                            + "Cancel registrations or wait until attendees withdraw before deleting.");
        }
    }

    private void validateEventDate(LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new InvalidEventDateException("Event date cannot be in the past");
        }
    }

    private void validateDuplicateEvent(User organizer, String title, LocalDate date, Long excludeEventId) {
        boolean exists = excludeEventId == null
                ? eventRepository.existsByOrganizerAndTitleIgnoreCaseAndDate(organizer, title, date)
                : eventRepository.existsByOrganizerAndTitleIgnoreCaseAndDateAndIdNot(
                        organizer, title, date, excludeEventId);

        if (exists) {
            throw new DuplicateEventException(
                    "You already have an event titled '" + title + "' on " + date);
        }
    }

    private void updateAvailableSeats(Event event, Integer newMaxSeats) {
        int registeredSeats = event.getMaxSeats() - event.getAvailableSeats();

        if (newMaxSeats < registeredSeats) {
            throw new InvalidSeatCountException(
                    "Cannot reduce max seats below the number of registered attendees (" + registeredSeats + ")");
        }

        event.setAvailableSeats(newMaxSeats - registeredSeats);
    }
}
