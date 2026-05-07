package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "smestuvanje_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Accommodation accommodation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
    private User user;

    @Column(nullable = false)
    private Integer ocenka; // 1-5

    @Column(length = 1000)
    private String komentar;
}