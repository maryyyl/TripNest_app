package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.dto.AuthResponseDTO;
import mk.ukim.finki.web.backend.model.dto.UserResponseDTO;

public interface UserService {

    AuthResponseDTO register(String username, String email, String password);

    AuthResponseDTO login(String username, String password);

    UserResponseDTO findByUsername(String username);
}