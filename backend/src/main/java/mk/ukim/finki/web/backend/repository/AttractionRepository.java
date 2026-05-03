package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    List<Attraction> findByLokacija(String lokacija);

    List<Attraction> findByStatus(String status);

    List<Attraction> findByCenaOdDenBetween(BigDecimal min, BigDecimal max);

    @Query("SELECT DISTINCT a FROM Attraction a JOIN a.tagovi t WHERE t IN :tagovi")
    List<Attraction> findByTagoviIn(@Param("tagovi") List<String> tagovi);

    @Query("SELECT DISTINCT a FROM Attraction a WHERE " +
            "LOWER(a.naslov) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.opis) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.lokacija) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Attraction> search(@Param("query") String query);
}
