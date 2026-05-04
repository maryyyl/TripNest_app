package mk.ukim.finki.web.backend.service;

import mk.ukim.finki.web.backend.model.AccommodationRequest;
import mk.ukim.finki.web.backend.model.dto.AccommodationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;

import java.util.List;

public interface AccommodationRequestService {

    AccommodationRequest create(AccommodationRequestDTO dto, String username);

    List<AccommodationRequest> findByUser(String username);

    List<AccommodationRequest> findAll();

    List<AccommodationRequest> findByStatus(RequestStatus status);

    AccommodationRequest updateStatus(Long id, RequestStatus status);

    // Кога admin ќе одобри — автоматски се креира Accommodation
    void approve(Long id);

    void reject(Long id);
}