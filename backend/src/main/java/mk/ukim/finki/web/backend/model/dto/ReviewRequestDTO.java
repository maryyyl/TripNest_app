package mk.ukim.finki.web.backend.model.dto;

import lombok.Data;

@Data
public class ReviewRequestDTO {
    private Integer ocenka;
    private String komentar;
}