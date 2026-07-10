package com.jyoti.eventmanagement.util;

import com.jyoti.eventmanagement.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ApiResponseUtil {

    private ApiResponseUtil() {
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {
        return ResponseEntity.ok(ApiResponse.success(message, data));
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(message, data));
    }

    public static ResponseEntity<ApiResponse<Void>> noContent(String message) {
        return ResponseEntity.ok(ApiResponse.success(message, null));
    }
}
