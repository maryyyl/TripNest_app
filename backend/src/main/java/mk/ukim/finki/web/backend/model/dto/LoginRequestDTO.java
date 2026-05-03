package mk.ukim.finki.web.backend.model.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {

    private String username;
    private String password;
}