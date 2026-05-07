package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.AttractionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttractionImageRepository extends JpaRepository<AttractionImage, Long> {
    List<AttractionImage> findByAttraction_IdOrderByRedosledAsc(Long attractionId);
}