package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gastronomija_sliki")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GastronomyImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gastronomija_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Gastronomy gastronomy;

    @Column(nullable = false, length = 1000)
    private String url;

    private Integer redosled;
}