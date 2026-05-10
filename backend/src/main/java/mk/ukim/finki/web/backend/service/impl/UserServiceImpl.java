package mk.ukim.finki.web.backend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.config.JwtUtil;
import mk.ukim.finki.web.backend.model.User;
import mk.ukim.finki.web.backend.model.dto.AuthResponseDTO;
import mk.ukim.finki.web.backend.model.dto.UserResponseDTO;
import mk.ukim.finki.web.backend.model.enums.Role;
import mk.ukim.finki.web.backend.repository.UserRepository;
import mk.ukim.finki.web.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponseDTO register(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists: " + email);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtUtil.generateToken(username);
        return new AuthResponseDTO(token, UserResponseDTO.from(user));
    }

    @Override
    public AuthResponseDTO login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(username);
        return new AuthResponseDTO(token, UserResponseDTO.from(user));
    }

    @Override
    public UserResponseDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        return UserResponseDTO.from(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}