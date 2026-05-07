package mk.ukim.finki.web.backend.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.model.Review;
import mk.ukim.finki.web.backend.model.User;
import mk.ukim.finki.web.backend.model.dto.ReviewRequestDTO;
import mk.ukim.finki.web.backend.repository.AccomodationRepository;
import mk.ukim.finki.web.backend.repository.ReviewRepository;
import mk.ukim.finki.web.backend.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final AccomodationRepository accommodationRepository;
    private final UserRepository userRepository;

    // ── Per accommodation ─────────────────────────────────────────────────────

    @GetMapping("/api/accommodations/{accommodationId}/reviews")
    public ResponseEntity<List<Review>> getAll(@PathVariable Long accommodationId) {
        return ResponseEntity.ok(reviewRepository.findByAccommodation_IdOrderByCreatedAtDesc(accommodationId));
    }

    @GetMapping("/api/accommodations/{accommodationId}/reviews/avg")
    public ResponseEntity<Map<String, Object>> getAvg(@PathVariable Long accommodationId) {
        Double avg = reviewRepository.avgOcenkaByAccommodationId(accommodationId);
        long count = reviewRepository.findByAccommodation_IdOrderByCreatedAtDesc(accommodationId).size();
        return ResponseEntity.ok(Map.of(
                "avg", avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0,
                "count", count
        ));
    }

    @PostMapping("/api/accommodations/{accommodationId}/reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Review> create(
            @PathVariable Long accommodationId,
            @RequestBody ReviewRequestDTO dto,
            Principal principal) {

        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = reviewRepository
                .findByAccommodation_IdAndUser_Id(accommodationId, user.getId())
                .orElse(new Review());

        review.setAccommodation(accommodation);
        review.setUser(user);
        review.setOcenka(dto.getOcenka());
        review.setKomentar(dto.getKomentar());

        return ResponseEntity.ok(reviewRepository.save(review));
    }

    @DeleteMapping("/api/accommodations/{accommodationId}/reviews/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> delete(@PathVariable Long accommodationId,
                                       @PathVariable Long reviewId,
                                       Principal principal) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (!review.getUser().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(403).build();
        }

        reviewRepository.delete(review);
        return ResponseEntity.noContent().build();
    }

    // ── Latest reviews for Home page ──────────────────────────────────────────

    @GetMapping("/api/reviews/latest")
    public ResponseEntity<List<Review>> getLatest(@RequestParam(defaultValue = "6") int limit) {
        return ResponseEntity.ok(reviewRepository.findLatest(PageRequest.of(0, limit)));
    }
}