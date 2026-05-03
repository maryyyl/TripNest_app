package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "atrakcii")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attraction extends BaseEntity {

    @Column(nullable = false)
    private String naslov;

    @Column(nullable = false)
    private String lokacija;

    @Column(name = "cena_od_den", precision = 10, scale = 2)
    private BigDecimal cenaOdDen;

    private String status;

    @Column(length = 512)
    private String link;

    @Column(length = 512)
    private String slika;

    @Column(columnDefinition = "TEXT")
    private String opis;

    @ElementCollection
    @CollectionTable(
            name = "atrakcija_tagovi",
            joinColumns = @JoinColumn(name = "atrakcija_id")
    )
    @Column(name = "tag")
    private List<String> tagovi;
}