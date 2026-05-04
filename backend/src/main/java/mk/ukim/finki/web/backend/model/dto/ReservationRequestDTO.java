package mk.ukim.finki.web.backend.model.dto;

import lombok.Data;

import java.time.LocalDate;

// ── Reservation ───────────────────────────────────────────────────────────────

@Data
public class ReservationRequestDTO {
    private Long accommodationId;
    private LocalDate datumOd;
    private LocalDate datumDo;
    private Integer brojLica;
    private String napomena;
}