package mk.ukim.finki.web.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.web.backend.model.enums.BudgetLevel;

import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "smestuvanja")
public class Accommodation extends BaseEntity {

    private String naslov;

    private String lokacija;

    private String adresa;

    private Double cenaOdDen;

    private String status; //superDomakin,superBrzDomakin , novo

    @Column(length = 1000)
    private String link;

    private String slika; //upload, a ne link, pri dodavanje od korisnik

    @Column(length = 2000)
    private String opis;


    private Integer kapacitet;

    private Boolean wifi;

    private Boolean spa;

    private Boolean bazen;

    private Boolean balkon;

    private Boolean parking;

    private Boolean kujna;

    private Boolean klima;

    private Boolean ljubimci;

    @Column(name = "check_in")
    private LocalTime checkIn;

    @Column(name = "check_out")
    private LocalTime checkOut;

    @ElementCollection
    @CollectionTable(
            name = "smestuvanje_tagovi",
            joinColumns = @JoinColumn(name = "smestuvanje_id")
    )
    @Column(name = "tag")
    private List<String> tagovi;

    @Transient
    public BudgetLevel getBudgetLevel() {
        if (cenaOdDen == null) return null;
        if (cenaOdDen < 2000) return BudgetLevel.LOW;
        else if (cenaOdDen < 5000) return BudgetLevel.MEDIUM;
        else return BudgetLevel.HIGH;
    }
}