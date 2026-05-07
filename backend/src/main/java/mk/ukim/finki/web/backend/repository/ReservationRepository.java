package mk.ukim.finki.web.backend.repository;

import mk.ukim.finki.web.backend.model.Reservation;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.time.LocalDate;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByStatus(RequestStatus status);

    List<Reservation> findByAccommodation_Id(Long smestuvanjeId);

    @Query("SELECT r FROM Reservation r WHERE r.accommodation.id = :id AND r.status = 'APPROVED'")
    List<Reservation> findApprovedByAccommodationId(@Param("id") Long id);
}