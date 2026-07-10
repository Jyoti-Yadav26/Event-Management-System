package com.jyoti.eventmanagement.repository;

import com.jyoti.eventmanagement.entity.Event;
import com.jyoti.eventmanagement.entity.Registration;
import com.jyoti.eventmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    List<Registration> findByUser(User user);

    List<Registration> findByEvent(Event event);

    Optional<Registration> findByUserAndEvent(User user, Event event);

    boolean existsByUserAndEvent(User user, Event event);
}
