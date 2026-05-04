package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.Reservation;
import mk.ukim.finki.web.backend.model.dto.ReservationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;

import java.util.List;

public interface ReservationService {

    Reservation create(ReservationRequestDTO dto, String username);

    List<Reservation> findByUser(String username);

    List<Reservation> findAll();

    List<Reservation> findByStatus(RequestStatus status);

    Reservation updateStatus(Long id, RequestStatus status);

    void delete(Long id);
}