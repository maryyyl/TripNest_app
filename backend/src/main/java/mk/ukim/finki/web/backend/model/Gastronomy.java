package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gastronomija")
public class Gastronomy extends BaseEntity {

    @Column(name = "naslov", nullable = false, length = 500)
    private String naslov;

    @Column(name = "lokacija", length = 255)
    private String lokacija;

    @Column(name = "status", length = 100)
    private String status;

    @Column(name = "opis", columnDefinition = "TEXT")
    private String opis;

    @Column(name = "link", length = 1000)
    private String link;

    @Column(name = "slika", length = 1000)
    private String slika;

    @ElementCollection
    @CollectionTable(
            name = "gastronomija_tagovi",
            joinColumns = @JoinColumn(name = "gastronomija_id")
    )
    @Column(name = "tag")
    private List<String> tagovi;
}