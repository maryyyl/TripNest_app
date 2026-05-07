package mk.ukim.finki.web.backend.web.controller;

import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import mk.ukim.finki.web.backend.model.AccommodationImage;
import mk.ukim.finki.web.backend.repository.AccommodationImageRepository;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccommodationController {

    private final AccommodationService accommodationService;
    private final AccommodationImageRepository imageRepository;

    @GetMapping("/{id}/sliki")
    public ResponseEntity<List<AccommodationImage>> getImages(@PathVariable Long id) {
        return ResponseEntity.ok(imageRepository.findByAccommodation_IdOrderByRedosledAsc(id));
    }

    // ── Јавни endpoints ───────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<Accommodation>> getAll() {
        return ResponseEntity.ok(accommodationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodation> getById(@PathVariable Long id) {
        return ResponseEntity.ok(accommodationService.findById(id));
    }

    @GetMapping("/lokacija/{lokacija}")
    public ResponseEntity<List<Accommodation>> getByLokacija(@PathVariable String lokacija) {
        return ResponseEntity.ok(accommodationService.findByLokacija(lokacija));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Accommodation>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(accommodationService.findByStatus(status));
    }

    @GetMapping("/tagovi")
    public ResponseEntity<List<Accommodation>> getByTagovi(@RequestParam List<String> tagovi) {
        return ResponseEntity.ok(accommodationService.findByTagovi(tagovi));
    }

    @GetMapping("/cena")
    public ResponseEntity<List<Accommodation>> getByCena(
            @RequestParam Double min,
            @RequestParam Double max) {
        return ResponseEntity.ok(accommodationService.findByCenaRange(min, max));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Accommodation>> search(@RequestParam String query) {
        return ResponseEntity.ok(accommodationService.search(query));
    }

    // ── Admin endpoints ───────────────────────────────────────────────────────

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Accommodation> create(@RequestBody Accommodation accommodation) {
        return ResponseEntity.ok(accommodationService.save(accommodation));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Accommodation> update(@PathVariable Long id, @RequestBody Accommodation accommodation) {
        return ResponseEntity.ok(accommodationService.update(id, accommodation));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        accommodationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}