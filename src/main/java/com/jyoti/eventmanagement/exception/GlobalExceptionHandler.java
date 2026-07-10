package com.jyoti.eventmanagement.exception;

import com.jyoti.eventmanagement.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<Void>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return buildFailure(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler({InvalidCredentialsException.class, BadCredentialsException.class})
    public ResponseEntity<ApiResponse<Void>> handleInvalidCredentials() {
        return buildFailure(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildFailure(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnauthorizedAccess(UnauthorizedAccessException ex) {
        return buildFailure(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(InvalidEventDateException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidEventDate(InvalidEventDateException ex) {
        return buildFailure(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidSeatCountException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidSeatCount(InvalidSeatCountException ex) {
        return buildFailure(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(DuplicateEventException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateEvent(DuplicateEventException ex) {
        return buildFailure(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(AlreadyRegisteredException.class)
    public ResponseEntity<ApiResponse<Void>> handleAlreadyRegistered(AlreadyRegisteredException ex) {
        return buildFailure(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(EventFullException.class)
    public ResponseEntity<ApiResponse<Void>> handleEventFull(EventFullException ex) {
        return buildFailure(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(RegistrationClosedException.class)
    public ResponseEntity<ApiResponse<Void>> handleRegistrationClosed(RegistrationClosedException ex) {
        return buildFailure(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(RegistrationNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleRegistrationNotFound(RegistrationNotFoundException ex) {
        return buildFailure(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> validationErrors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.failure("Validation failed", validationErrors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleMalformedJson() {
        return buildFailure(HttpStatus.BAD_REQUEST, "Invalid request body — check JSON format and field values");
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return buildFailure(HttpStatus.BAD_REQUEST,
                "Invalid value for parameter '" + ex.getName() + "'");
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Void>> handleAuthenticationException() {
        return buildFailure(HttpStatus.UNAUTHORIZED, "Authentication required — please login");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDenied() {
        return buildFailure(HttpStatus.FORBIDDEN, "Access denied — insufficient permissions");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException() {
        return buildFailure(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
    }

    private ResponseEntity<ApiResponse<Void>> buildFailure(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(ApiResponse.failure(message));
    }
}
