package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.AccommodationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationImageRepository extends JpaRepository<AccommodationImage, Long> {

    List<AccommodationImage> findByAccommodation_IdOrderByRedosledAsc(Long accommodationId);
}