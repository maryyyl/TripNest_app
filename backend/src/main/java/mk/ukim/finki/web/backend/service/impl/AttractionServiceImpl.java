package mk.ukim.finki.web.backend.service.impl;

import mk.ukim.finki.web.backend.model.Attraction;
import mk.ukim.finki.web.backend.repository.AttractionRepository;
import mk.ukim.finki.web.backend.service.AttractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttractionServiceImpl implements AttractionService {

    private final AttractionRepository attractionRepository;

    @Override
    public List<Attraction> findAll() {
        return attractionRepository.findAll();
    }

    @Override
    public Attraction findById(Long id) {
        return attractionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attraction not found with id: " + id));
    }

    @Override
    public List<Attraction> findByLokacija(String lokacija) {
        return attractionRepository.findByLokacija(lokacija);
    }

    @Override
    public List<Attraction> findByStatus(String status) {
        return attractionRepository.findByStatus(status);
    }

    @Override
    public List<Attraction> findByTagovi(List<String> tagovi) {
        return attractionRepository.findByTagoviIn(tagovi);
    }

    @Override
    public List<Attraction> findByCenaRange(BigDecimal min, BigDecimal max) {
        return attractionRepository.findByCenaOdDenBetween(min, max);
    }

    @Override
    public List<Attraction> search(String query) {
        return attractionRepository.search(query);
    }

    @Override
    public Attraction save(Attraction attraction) {
        return attractionRepository.save(attraction);
    }

    @Override
    public Attraction update(Long id, Attraction updated) {
        Attraction existing = findById(id);
        existing.setNaslov(updated.getNaslov());
        existing.setLokacija(updated.getLokacija());
        existing.setCenaOdDen(updated.getCenaOdDen());
        existing.setStatus(updated.getStatus());
        existing.setLink(updated.getLink());
        existing.setSlika(updated.getSlika());
        existing.setOpis(updated.getOpis());
        existing.setTagovi(updated.getTagovi());
        return attractionRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        attractionRepository.deleteById(id);
    }
}