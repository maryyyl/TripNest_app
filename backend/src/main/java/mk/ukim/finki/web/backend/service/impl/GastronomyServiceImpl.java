package mk.ukim.finki.web.backend.service.impl;

import mk.ukim.finki.web.backend.model.Gastronomy;
import mk.ukim.finki.web.backend.repository.GastronomyRepository;
import mk.ukim.finki.web.backend.service.GastronomyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GastronomyServiceImpl implements GastronomyService {

    private final GastronomyRepository gastronomyRepository;

    @Override
    public List<Gastronomy> findAll() {
        return gastronomyRepository.findAll();
    }

    @Override
    public Gastronomy findById(Long id) {
        return gastronomyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gastronomy not found with id: " + id));
    }

    @Override
    public List<Gastronomy> findByLokacija(String lokacija) {
        return gastronomyRepository.findByLokacija(lokacija);
    }

    @Override
    public List<Gastronomy> findByStatus(String status) {
        return gastronomyRepository.findByStatus(status);
    }

    @Override
    public List<Gastronomy> findByTagovi(List<String> tagovi) {
        return gastronomyRepository.findByTagoviIn(tagovi);
    }

    @Override
    public List<Gastronomy> search(String query) {
        return gastronomyRepository.search(query);
    }

    @Override
    public Gastronomy save(Gastronomy gastronomy) {
        return gastronomyRepository.save(gastronomy);
    }

    @Override
    public Gastronomy update(Long id, Gastronomy updated) {
        Gastronomy existing = findById(id);
        existing.setNaslov(updated.getNaslov());
        existing.setLokacija(updated.getLokacija());
        existing.setStatus(updated.getStatus());
        existing.setOpis(updated.getOpis());
        existing.setLink(updated.getLink());
        existing.setSlika(updated.getSlika());
        existing.setTagovi(updated.getTagovi());
        return gastronomyRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        gastronomyRepository.deleteById(id);
    }
}