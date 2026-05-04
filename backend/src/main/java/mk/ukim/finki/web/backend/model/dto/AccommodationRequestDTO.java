package mk.ukim.finki.web.backend.model.dto;

import lombok.Data;

@Data
public class AccommodationRequestDTO {
    private String naslov;
    private String lokacija;
    private String link;
    private String opis;
    private String slika;
    private Double cenaOdDen;
    private String napomena;
}