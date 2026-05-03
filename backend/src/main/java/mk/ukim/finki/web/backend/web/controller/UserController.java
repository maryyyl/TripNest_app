package mk.ukim.finki.web.backend.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.dto.AuthResponseDTO;
import mk.ukim.finki.web.backend.model.dto.LoginRequestDTO;
import mk.ukim.finki.web.backend.model.dto.RegisterRequestDTO;
import mk.ukim.finki.web.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(userService.register(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(userService.login(
                request.getUsername(),
                request.getPassword()
        ));
    }
}