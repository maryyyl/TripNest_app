package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atrakcija_sliki")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttractionImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atrakcija_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Attraction attraction;

    @Column(nullable = false, length = 1000)
    private String url;

    private Integer redosled;
}