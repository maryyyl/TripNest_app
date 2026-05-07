package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByAccommodation_IdOrderByCreatedAtDesc(Long accommodationId);

    Optional<Review> findByAccommodation_IdAndUser_Id(Long accommodationId, Long userId);

    @Query("SELECT AVG(r.ocenka) FROM Review r WHERE r.accommodation.id = :id")
    Double avgOcenkaByAccommodationId(@Param("id") Long id);

    @Query("SELECT r FROM Review r WHERE r.komentar IS NOT NULL AND LENGTH(r.komentar) > 20 ORDER BY r.createdAt DESC")
    List<Review> findLatest(Pageable pageable);
}