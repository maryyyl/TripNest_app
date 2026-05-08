package mk.ukim.finki.web.backend.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.ContactMessage;
import mk.ukim.finki.web.backend.model.dto.ContactRequestDTO;
import mk.ukim.finki.web.backend.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ResponseEntity<Void> send(@RequestBody ContactRequestDTO dto) {
        ContactMessage msg = new ContactMessage();
        msg.setIme(dto.getIme());
        msg.setEmail(dto.getEmail());
        msg.setSubject(dto.getSubject());
        msg.setPoraka(dto.getPoraka());
        msg.setProcitana(false);
        contactMessageRepository.save(msg);
        return ResponseEntity.ok().build();
    }

    // Admin — сите пораки
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessage>> getAll() {
        return ResponseEntity.ok(contactMessageRepository.findAllByOrderByCreatedAtDesc());
    }

    // Admin — број непрочитани
    @GetMapping("/unread-count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Long>> getUnreadCount() {
        return ResponseEntity.ok(Map.of("count", contactMessageRepository.countByProcitanaFalse()));
    }

    // Admin — означи како прочитана
    @PutMapping("/{id}/procitana")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        contactMessageRepository.findById(id).ifPresent(msg -> {
            msg.setProcitana(true);
            contactMessageRepository.save(msg);
        });
        return ResponseEntity.ok().build();
    }

    // Admin — избриши
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactMessageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}