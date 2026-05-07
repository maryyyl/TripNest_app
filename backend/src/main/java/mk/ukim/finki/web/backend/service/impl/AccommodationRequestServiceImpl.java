package mk.ukim.finki.web.backend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.model.AccommodationRequest;
import mk.ukim.finki.web.backend.model.User;
import mk.ukim.finki.web.backend.model.dto.AccommodationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import mk.ukim.finki.web.backend.repository.AccommodationRequestRepository;
import mk.ukim.finki.web.backend.repository.AccomodationRepository;
import mk.ukim.finki.web.backend.repository.UserRepository;
import mk.ukim.finki.web.backend.service.AccommodationRequestService;
import org.springframework.stereotype.Service;

import java.util.List;

import mk.ukim.finki.web.backend.service.impl.EmailService;

@Service
@RequiredArgsConstructor
public class AccommodationRequestServiceImpl implements AccommodationRequestService {

    private final AccommodationRequestRepository requestRepository;
    private final AccomodationRepository accommodationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public AccommodationRequest create(AccommodationRequestDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AccommodationRequest request = new AccommodationRequest();
        request.setUser(user);
        request.setNaslov(dto.getNaslov());
        request.setLokacija(dto.getLokacija());
        request.setLink(dto.getLink());
        request.setOpis(dto.getOpis());
        request.setSlika(dto.getSlika());
        request.setCenaOdDen(dto.getCenaOdDen());
        request.setNapomena(dto.getNapomena());
        request.setStatus(RequestStatus.PENDING);

        return requestRepository.save(request);
    }

    @Override
    public List<AccommodationRequest> findByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return requestRepository.findByUserId(user.getId());
    }

    @Override
    public List<AccommodationRequest> findAll() {
        return requestRepository.findAll();
    }

    @Override
    public List<AccommodationRequest> findByStatus(RequestStatus status) {
        return requestRepository.findByStatus(status);
    }

    @Override
    public AccommodationRequest updateStatus(Long id, RequestStatus status) {
        AccommodationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return requestRepository.save(request);
    }

    @Override
    public void approve(Long id) {
        AccommodationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Accommodation accommodation = new Accommodation();
        accommodation.setNaslov(request.getNaslov());
        accommodation.setLokacija(request.getLokacija());
        accommodation.setLink(request.getLink());
        accommodation.setOpis(request.getOpis());
        accommodation.setSlika(request.getSlika());
        accommodation.setCenaOdDen(request.getCenaOdDen());
        accommodation.setStatus("НОВО");
        accommodationRepository.save(accommodation);

        request.setStatus(RequestStatus.APPROVED);
        requestRepository.save(request);

        emailService.sendAccommodationRequestStatusEmail(
                request.getUser().getEmail(),
                request.getUser().getUsername(),
                request.getNaslov(),
                "APPROVED"
        );
    }

    @Override
    public void reject(Long id) {
        AccommodationRequest request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(RequestStatus.REJECTED);
        requestRepository.save(request);

        emailService.sendAccommodationRequestStatusEmail(
                request.getUser().getEmail(),
                request.getUser().getUsername(),
                request.getNaslov(),
                "REJECTED"
        );
    }
}