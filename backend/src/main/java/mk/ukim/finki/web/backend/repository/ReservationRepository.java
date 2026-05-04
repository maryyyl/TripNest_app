package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Reservation;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByStatus(RequestStatus status);

    List<Reservation> findByAccommodation_Id(Long smestuvanjeId);
}