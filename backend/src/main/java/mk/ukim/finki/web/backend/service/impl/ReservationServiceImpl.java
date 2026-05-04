package mk.ukim.finki.web.backend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.model.Reservation;
import mk.ukim.finki.web.backend.model.User;
import mk.ukim.finki.web.backend.model.dto.ReservationRequestDTO;
import mk.ukim.finki.web.backend.model.enums.RequestStatus;
import mk.ukim.finki.web.backend.repository.AccomodationRepository;
import mk.ukim.finki.web.backend.repository.ReservationRepository;
import mk.ukim.finki.web.backend.repository.UserRepository;
import mk.ukim.finki.web.backend.service.ReservationService;
import org.springframework.stereotype.Service;

import java.util.List;

import mk.ukim.finki.web.backend.service.EmailService;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final AccomodationRepository accommodationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public Reservation create(ReservationRequestDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Accommodation accommodation = accommodationRepository.findById(dto.getAccommodationId())
                .orElseThrow(() -> new RuntimeException("Accommodation not found"));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setAccommodation(accommodation);
        reservation.setDatumOd(dto.getDatumOd());
        reservation.setDatumDo(dto.getDatumDo());
        reservation.setBrojLica(dto.getBrojLica());
        reservation.setNapomena(dto.getNapomena());
        reservation.setStatus(RequestStatus.PENDING);

        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reservationRepository.findByUserId(user.getId());
    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> findByStatus(RequestStatus status) {
        return reservationRepository.findByStatus(status);
    }

    @Override
    public Reservation updateStatus(Long id, RequestStatus status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.setStatus(status);
        Reservation saved = reservationRepository.save(reservation);
        emailService.sendReservationStatusEmail(saved);
        return saved;
    }

    @Override
    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }
}