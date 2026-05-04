package mk.ukim.finki.web.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;

@Entity
@Table(name = "accommodation_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
    private User user;

    @Column(nullable = false)
    private String naslov;

    @Column(nullable = false)
    private String lokacija;

    @Column(length = 1000)
    private String link;

    @Column(columnDefinition = "TEXT")
    private String opis;

    private String slika;

    private Double cenaOdDen;

    @Column(length = 500)
    private String napomena;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status = RequestStatus.PENDING;
}