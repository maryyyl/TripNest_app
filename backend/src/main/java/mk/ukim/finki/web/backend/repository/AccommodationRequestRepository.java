package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.AccommodationRequest;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccommodationRequestRepository extends JpaRepository<AccommodationRequest, Long> {

    List<AccommodationRequest> findByUserId(Long userId);

    List<AccommodationRequest> findByStatus(RequestStatus status);
}