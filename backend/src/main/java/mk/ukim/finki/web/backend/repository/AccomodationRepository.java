package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccomodationRepository extends JpaRepository<Accommodation, Long> {
    List<Accommodation> findByLokacija(String lokacija);

    List<Accommodation> findByStatus(String status);

    List<Accommodation> findByCenaOdDenBetween(Double min, Double max);

    @Query("SELECT DISTINCT a FROM Accommodation a JOIN a.tagovi t WHERE t IN :tagovi")
    List<Accommodation> findByTagoviIn(@Param("tagovi") List<String> tagovi);

    @Query("SELECT DISTINCT a FROM Accommodation a WHERE " +
            "LOWER(a.naslov) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.opis) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(a.lokacija) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Accommodation> search(@Param("query") String query);
}
