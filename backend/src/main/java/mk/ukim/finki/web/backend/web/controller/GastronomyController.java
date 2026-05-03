package mk.ukim.finki.web.backend.web.controller;

import mk.ukim.finki.web.backend.model.Gastronomy;
import mk.ukim.finki.web.backend.service.GastronomyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gastronomy")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GastronomyController {

    private final GastronomyService gastronomyService;


    @GetMapping
    public ResponseEntity<List<Gastronomy>> getAll() {
        return ResponseEntity.ok(gastronomyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gastronomy> getById(@PathVariable Long id) {
        return ResponseEntity.ok(gastronomyService.findById(id));
    }

    @GetMapping("/lokacija/{lokacija}")
    public ResponseEntity<List<Gastronomy>> getByLokacija(@PathVariable String lokacija) {
        return ResponseEntity.ok(gastronomyService.findByLokacija(lokacija));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Gastronomy>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(gastronomyService.findByStatus(status));
    }

    @GetMapping("/tagovi")
    public ResponseEntity<List<Gastronomy>> getByTagovi(@RequestParam List<String> tagovi) {
        return ResponseEntity.ok(gastronomyService.findByTagovi(tagovi));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Gastronomy>> search(@RequestParam String query) {
        return ResponseEntity.ok(gastronomyService.search(query));
    }

    // ── Admin endpoints (бара ADMIN роља) ────────────────────────────────────

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Gastronomy> create(@RequestBody Gastronomy gastronomy) {
        return ResponseEntity.ok(gastronomyService.save(gastronomy));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Gastronomy> update(@PathVariable Long id, @RequestBody Gastronomy gastronomy) {
        return ResponseEntity.ok(gastronomyService.update(id, gastronomy));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        gastronomyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}