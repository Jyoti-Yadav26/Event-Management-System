package com.jyoti.eventmanagement.controller;

import com.jyoti.eventmanagement.dto.request.LoginRequest;
import com.jyoti.eventmanagement.dto.request.RegisterRequest;
import com.jyoti.eventmanagement.dto.response.ApiResponse;
import com.jyoti.eventmanagement.dto.response.AuthResponse;
import com.jyoti.eventmanagement.service.AuthService;
import com.jyoti.eventmanagement.util.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User registration and login APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates an ORGANIZER or ATTENDEE account and returns a JWT token")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201", description = "User registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409", description = "Email already registered")
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = @Content(examples = @ExampleObject(value = """
                    {
                      "name": "Jyoti Rai",
                      "email": "user@example.com",
                      "password": "password123",
                      "role": "ATTENDEE"
                    }
                    """)))
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ApiResponseUtil.created("Registration successful", response);
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticates user credentials and returns a JWT token")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200", description = "Login successful"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401", description = "Invalid credentials")
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = @Content(examples = @ExampleObject(value = """
                    {
                      "email": "user@example.com",
                      "password": "password123"
                    }
                    """)))
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ApiResponseUtil.ok("Login successful", response);
    }
}
