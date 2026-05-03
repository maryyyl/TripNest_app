package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Gastronomy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GastronomyRepository extends JpaRepository<Gastronomy, Long> {
    List<Gastronomy> findByLokacija(String lokacija);

    List<Gastronomy> findByStatus(String status);

    @Query("SELECT DISTINCT g FROM Gastronomy g JOIN g.tagovi t WHERE t IN :tagovi")
    List<Gastronomy> findByTagoviIn(@Param("tagovi") List<String> tagovi);

    @Query("SELECT DISTINCT g FROM Gastronomy g WHERE " +
            "LOWER(g.naslov) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.opis) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(g.lokacija) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Gastronomy> search(@Param("query") String query);
}
