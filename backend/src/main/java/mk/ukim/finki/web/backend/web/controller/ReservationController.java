package mk.ukim.finki.web.backend.web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.Reservation;
import mk.ukim.finki.web.backend.model.dto.ReservationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import mk.ukim.finki.web.backend.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationService reservationService;

    // Јавен — зафатени датуми за сместување
    @GetMapping("/booked-dates/{accommodationId}")
    public ResponseEntity<List<LocalDate>> getBookedDates(@PathVariable Long accommodationId) {
        return ResponseEntity.ok(reservationService.getBookedDates(accommodationId));
    }

    // Корисник — креира резервација
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Reservation> create(@RequestBody ReservationRequestDTO dto, Principal principal) {
        return ResponseEntity.ok(reservationService.create(dto, principal.getName()));
    }

    // Корисник — ги гледа своите резервации
    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Reservation>> myReservations(Principal principal) {
        return ResponseEntity.ok(reservationService.findByUser(principal.getName()));
    }

    // Admin — ги гледа сите
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reservation>> getAll() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    // Admin — филтрирање по статус
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Reservation>> getByStatus(@PathVariable RequestStatus status) {
        return ResponseEntity.ok(reservationService.findByStatus(status));
    }

    // Admin — одобри/одбиј
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Reservation> updateStatus(@PathVariable Long id, @RequestParam RequestStatus status) {
        return ResponseEntity.ok(reservationService.updateStatus(id, status));
    }

    // Admin — избриши
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}