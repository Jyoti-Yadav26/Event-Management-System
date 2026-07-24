package com.jyoti.eventmanagement.controller;

import com.jyoti.eventmanagement.dto.response.ApiResponse;
import com.jyoti.eventmanagement.dto.response.RegistrationResponse;
import com.jyoti.eventmanagement.service.RegistrationService;
import com.jyoti.eventmanagement.util.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
@Tag(name = "Registrations", description = "Event registration APIs for attendees")
@SecurityRequirement(name = "Bearer Authentication")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/{eventId}")
    @PreAuthorize("hasRole('ATTENDEE')")
    @Operation(summary = "Register for event", description = "Registers the logged-in attendee for an event")
    public ResponseEntity<ApiResponse<RegistrationResponse>> registerForEvent(@PathVariable Long eventId) {
        RegistrationResponse response = registrationService.registerForEvent(eventId);
        return ApiResponseUtil.created("Registration successful", response);
    }

    @DeleteMapping("/{eventId}")
    @PreAuthorize("hasRole('ATTENDEE')")
    @Operation(summary = "Cancel registration", description = "Cancels the attendee's registration for an event")
    public ResponseEntity<ApiResponse<Void>> cancelRegistration(@PathVariable Long eventId) {
        registrationService.cancelRegistration(eventId);
        return ApiResponseUtil.noContent("Registration cancelled successfully");
    }

    @GetMapping("/my-events")
    @PreAuthorize("hasRole('ATTENDEE')")
    @Operation(summary = "Get my registrations", description = "Returns all events the logged-in attendee has registered for")
    public ResponseEntity<ApiResponse<List<RegistrationResponse>>> getMyRegistrations() {
        List<RegistrationResponse> registrations = registrationService.getMyRegistrations();
        return ApiResponseUtil.ok("Registrations fetched successfully", registrations);
    }
}
