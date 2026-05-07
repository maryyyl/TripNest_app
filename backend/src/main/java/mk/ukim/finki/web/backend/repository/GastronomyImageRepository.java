package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.GastronomyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GastronomyImageRepository extends JpaRepository<GastronomyImage, Long> {
    List<GastronomyImage> findByGastronomy_IdOrderByRedosledAsc(Long gastronomyId);
}