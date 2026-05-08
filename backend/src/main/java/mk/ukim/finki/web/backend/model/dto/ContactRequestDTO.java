package mk.ukim.finki.web.backend.model.dto;

import lombok.Data;

@Data
public class ContactRequestDTO {
    private String ime;
    private String email;
    private String subject;
    private String poraka;
}