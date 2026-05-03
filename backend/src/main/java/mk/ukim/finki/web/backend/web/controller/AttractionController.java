package mk.ukim.finki.web.backend.web.controller;

import mk.ukim.finki.web.backend.model.Attraction;
import mk.ukim.finki.web.backend.service.AttractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/attractions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AttractionController {

    private final AttractionService attractionService;

    // ── Јавни endpoints ───────────────────────────────────────────────────────

    @GetMapping
    public ResponseEntity<List<Attraction>> getAll() {
        return ResponseEntity.ok(attractionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attraction> getById(@PathVariable Long id) {
        return ResponseEntity.ok(attractionService.findById(id));
    }

    @GetMapping("/lokacija/{lokacija}")
    public ResponseEntity<List<Attraction>> getByLokacija(@PathVariable String lokacija) {
        return ResponseEntity.ok(attractionService.findByLokacija(lokacija));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Attraction>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(attractionService.findByStatus(status));
    }

    @GetMapping("/tagovi")
    public ResponseEntity<List<Attraction>> getByTagovi(@RequestParam List<String> tagovi) {
        return ResponseEntity.ok(attractionService.findByTagovi(tagovi));
    }

    @GetMapping("/cena")
    public ResponseEntity<List<Attraction>> getByCena(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(attractionService.findByCenaRange(min, max));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Attraction>> search(@RequestParam String query) {
        return ResponseEntity.ok(attractionService.search(query));
    }

    // ── Admin endpoints ───────────────────────────────────────────────────────

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Attraction> create(@RequestBody Attraction attraction) {
        return ResponseEntity.ok(attractionService.save(attraction));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Attraction> update(@PathVariable Long id, @RequestBody Attraction attraction) {
        return ResponseEntity.ok(attractionService.update(id, attraction));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        attractionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}