package com.jyoti.eventmanagement.controller;

import com.jyoti.eventmanagement.dto.request.EventRequest;
import com.jyoti.eventmanagement.dto.response.ApiResponse;
import com.jyoti.eventmanagement.dto.response.EventResponse;
import com.jyoti.eventmanagement.entity.enums.EventCategory;
import com.jyoti.eventmanagement.service.EventService;
import com.jyoti.eventmanagement.util.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@Tag(name = "Events", description = "Event management and browsing APIs")
public class EventController {

    private final EventService eventService;

    @PostMapping
    @PreAuthorize("hasRole('ORGANIZER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create event", description = "Creates a new event for the authenticated organizer")
    public ResponseEntity<ApiResponse<EventResponse>> createEvent(@Valid @RequestBody EventRequest request) {
        EventResponse response = eventService.createEvent(request);
        return ApiResponseUtil.created("Event created successfully", response);
    }

    @GetMapping
    @Operation(summary = "Get all events", description = "Public endpoint — supports search, filter, and pagination")
    public ResponseEntity<ApiResponse<Page<EventResponse>>> getAllEvents(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) EventCategory category,
            @PageableDefault(size = 10, sort = "date", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<EventResponse> events = eventService.getAllEvents(title, category, pageable);
        return ApiResponseUtil.ok("Events fetched successfully", events);
    }

    @GetMapping("/my-events")
    @PreAuthorize("hasRole('ORGANIZER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Get my events", description = "Returns events created by the logged-in organizer")
    public ResponseEntity<ApiResponse<Page<EventResponse>>> getMyEvents(
            @PageableDefault(size = 10, sort = "date", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<EventResponse> events = eventService.getMyEvents(pageable);
        return ApiResponseUtil.ok("Your events fetched successfully", events);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID", description = "Public endpoint — returns a single event")
    public ResponseEntity<ApiResponse<EventResponse>> getEventById(@PathVariable Long id) {
        EventResponse response = eventService.getEventById(id);
        return ApiResponseUtil.ok("Event fetched successfully", response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ORGANIZER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update event", description = "Updates an event — only the owner organizer can update")
    public ResponseEntity<ApiResponse<EventResponse>> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request) {
        EventResponse response = eventService.updateEvent(id, request);
        return ApiResponseUtil.ok("Event updated successfully", response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ORGANIZER')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete event", description = "Deletes an event — only the owner organizer can delete")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ApiResponseUtil.noContent("Event deleted successfully");
    }
}
