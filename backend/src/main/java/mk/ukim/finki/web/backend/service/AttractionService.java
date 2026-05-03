package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.Attraction;

import java.math.BigDecimal;
import java.util.List;

public interface AttractionService {

    List<Attraction> findAll();

    Attraction findById(Long id);

    List<Attraction> findByLokacija(String lokacija);

    List<Attraction> findByStatus(String status);

    List<Attraction> findByTagovi(List<String> tagovi);

    List<Attraction> findByCenaRange(BigDecimal min, BigDecimal max);

    List<Attraction> search(String query);

    Attraction save(Attraction attraction);

    Attraction update(Long id, Attraction updated);

    void delete(Long id);
}