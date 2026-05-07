package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "smestuvanje_sliki")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccommodationImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "smestuvanje_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Accommodation accommodation;

    @Column(nullable = false, length = 1000)
    private String url;

    private Integer redosled;
}