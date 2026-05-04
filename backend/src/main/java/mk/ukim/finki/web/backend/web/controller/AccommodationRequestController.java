package mk.ukim.finki.web.backend.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.AccommodationRequest;
import mk.ukim.finki.web.backend.model.dto.AccommodationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import mk.ukim.finki.web.backend.service.AccommodationRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/accommodation-requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccommodationRequestController {

    private final AccommodationRequestService requestService;

    // Корисник — предлага ново сместување
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AccommodationRequest> create(@RequestBody AccommodationRequestDTO dto, Principal principal) {
        return ResponseEntity.ok(requestService.create(dto, principal.getName()));
    }

    // Корисник — ги гледа своите предлози
    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AccommodationRequest>> myRequests(Principal principal) {
        return ResponseEntity.ok(requestService.findByUser(principal.getName()));
    }

    // Admin — ги гледа сите
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AccommodationRequest>> getAll() {
        return ResponseEntity.ok(requestService.findAll());
    }

    // Admin — филтрирање по статус
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AccommodationRequest>> getByStatus(@PathVariable RequestStatus status) {
        return ResponseEntity.ok(requestService.findByStatus(status));
    }

    // Admin — одобри (автоматски креира Accommodation)
    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        requestService.approve(id);
        return ResponseEntity.ok().build();
    }

    // Admin — одбиј
    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> reject(@PathVariable Long id) {
        requestService.reject(id);
        return ResponseEntity.ok().build();
    }
}