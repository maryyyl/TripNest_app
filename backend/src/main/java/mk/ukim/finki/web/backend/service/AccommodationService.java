package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.Accommodation;

import java.util.List;

public interface AccommodationService {

    List<Accommodation> findAll();

    Accommodation findById(Long id);

    List<Accommodation> findByLokacija(String lokacija);

    List<Accommodation> findByStatus(String status);

    List<Accommodation> findByTagovi(List<String> tagovi);

    List<Accommodation> findByCenaRange(Double min, Double max);

    List<Accommodation> search(String query);

    Accommodation save(Accommodation accommodation);

    Accommodation update(Long id, Accommodation updated);

    void delete(Long id);
}