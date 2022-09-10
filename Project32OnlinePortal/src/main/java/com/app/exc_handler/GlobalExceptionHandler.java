package com.app.exc_handler;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;

@ControllerAdvice // Mandatory cls level annotation to tell SC : following is global exc handler
					// (a spring bean)
					// class --to advise all controllers (RestController) , regarding exc handling
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	// exc handling methods.

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		System.out.println("in handle method arg not valid !!!!!!!!!!!!!!!!!!");
		Map<String, String> collect = ex.getBindingResult().getFieldErrors().stream() // Stream<FieldError>
				.collect(Collectors.toMap(f -> f.getField(), FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(collect);
	}

	// how to tell SC , that followin g is exc handling method
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		System.out.println("in handle res not found...");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
	}
	//for all remaining excs : add global exc handling method
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
		System.out.println("in handle run time exc");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	}
	

}
