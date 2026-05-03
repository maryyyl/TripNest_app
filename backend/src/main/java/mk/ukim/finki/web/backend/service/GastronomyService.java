package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.Gastronomy;

import java.util.List;

public interface GastronomyService {

    List<Gastronomy> findAll();

    Gastronomy findById(Long id);

    List<Gastronomy> findByLokacija(String lokacija);

    List<Gastronomy> findByStatus(String status);

    List<Gastronomy> findByTagovi(List<String> tagovi);

    List<Gastronomy> search(String query);

    Gastronomy save(Gastronomy gastronomy);

    Gastronomy update(Long id, Gastronomy updated);

    void delete(Long id);
}