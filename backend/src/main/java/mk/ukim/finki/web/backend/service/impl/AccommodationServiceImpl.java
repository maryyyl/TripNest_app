package mk.ukim.finki.web.backend.service.impl;

import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.repository.AccomodationRepository;
import mk.ukim.finki.web.backend.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService {

    private final AccomodationRepository accomodationRepository;

    @Override
    public List<Accommodation> findAll() {
        return accomodationRepository.findAll();
    }

    @Override
    public Accommodation findById(Long id) {
        return accomodationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accommodation not found with id: " + id));
    }

    @Override
    public List<Accommodation> findByLokacija(String lokacija) {
        return accomodationRepository.findByLokacija(lokacija);
    }

    @Override
    public List<Accommodation> findByStatus(String status) {
        return accomodationRepository.findByStatus(status);
    }

    @Override
    public List<Accommodation> findByTagovi(List<String> tagovi) {
        return accomodationRepository.findByTagoviIn(tagovi);
    }

    @Override
    public List<Accommodation> findByCenaRange(Double min, Double max) {
        return accomodationRepository.findByCenaOdDenBetween(min, max);
    }

    @Override
    public List<Accommodation> search(String query) {
        return accomodationRepository.search(query);
    }

    @Override
    public Accommodation save(Accommodation accommodation) {
        return accomodationRepository.save(accommodation);
    }

    @Override
    public Accommodation update(Long id, Accommodation updated) {
        Accommodation existing = findById(id);
        existing.setNaslov(updated.getNaslov());
        existing.setLokacija(updated.getLokacija());
        existing.setCenaOdDen(updated.getCenaOdDen());
        existing.setStatus(updated.getStatus());
        existing.setLink(updated.getLink());
        existing.setSlika(updated.getSlika());
        existing.setOpis(updated.getOpis());
        existing.setTagovi(updated.getTagovi());
        return accomodationRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        accomodationRepository.deleteById(id);
    }
}