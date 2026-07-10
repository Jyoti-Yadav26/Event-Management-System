package com.jyoti.eventmanagement.repository;

import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.User;
import com.jyoti.eventmanagement.entity.enums.EventCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Event> findByCategory(EventCategory category, Pageable pageable);

    Page<Event> findByCategoryAndTitleContainingIgnoreCase(
            EventCategory category, String title, Pageable pageable);

    Page<Event> findByOrganizer(User organizer, Pageable pageable);

    boolean existsByOrganizerAndTitleIgnoreCaseAndDate(User organizer, String title, LocalDate date);

    boolean existsByOrganizerAndTitleIgnoreCaseAndDateAndIdNot(
            User organizer, String title, LocalDate date, Long id);
}
