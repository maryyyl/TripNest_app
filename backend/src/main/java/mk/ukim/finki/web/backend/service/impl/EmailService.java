package mk.ukim.finki.web.backend.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.web.backend.model.Reservation;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendReservationStatusEmail(Reservation reservation) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String userEmail = reservation.getUser().getEmail();
            String username = reservation.getUser().getUsername();
            String naslov = reservation.getAccommodation().getNaslov();
            String status = reservation.getStatus().name();
            LocalTime checkIn=reservation.getAccommodation().getCheckIn();
            LocalTime checkOut=reservation.getAccommodation().getCheckOut();



            helper.setTo(userEmail);
            helper.setSubject(buildSubject(status, naslov));
            helper.setText(buildBody(status, username, naslov, reservation), true);

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    @Async
    public void sendAccommodationRequestStatusEmail(String email, String username, String naslov, String status) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject(buildRequestSubject(status, naslov));
            helper.setText(buildRequestBody(status, username, naslov), true);

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    private String buildSubject(String status, String naslov) {
        if ("APPROVED".equals(status)) {
            return "✅ Резервацијата е потврдена — " + naslov;
        } else {
            return "❌ Резервацијата е одбиена — " + naslov;
        }
    }

    private String buildBody(String status, String username, String naslov, Reservation r) {
        boolean approved = "APPROVED".equals(status);
        String color = approved ? "#4a7c59" : "#c0392b";
        String icon = approved ? "✅" : "❌";
        String statusText = approved ? "ПОТВРДЕНА" : "ОДБИЕНА";

        return """
                <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #f5ede4; padding: 2rem; border-radius: 1rem;">
                  <div style="background: %s; color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">%s</div>
                    <h2 style="margin: 0; font-size: 1.3rem;">Резервацијата е %s</h2>
                  </div>
                  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem;">
                    <p>Здраво <strong>%s</strong>,</p>
                    <p>Твојата резервација за <strong>%s</strong> е <strong>%s</strong>.</p>
                    <hr style="border: none; border-top: 1px solid #e8d5c4; margin: 1rem 0;">
                    <p style="font-size: 0.9rem; color: #7a7a6a;">🗓️ %s → %s</p>
                    <p style="font-size: 0.9rem; color: #7a7a6a;">👥 %d лица</p>
                  </div>
                  <p style="text-align: center; color: #8b6245; font-size: 0.8rem; margin-top: 1.5rem;">
                    © TripNest.mk — Your Travel Guide
                  </p>
                </div>
                """.formatted(color, icon, statusText, username, naslov, statusText,
                r.getDatumOd(), r.getDatumDo(), r.getBrojLica());
    }

    private String buildRequestSubject(String status, String naslov) {
        if ("APPROVED".equals(status)) {
            return "✅ Твојот предлог е прифатен — " + naslov;
        } else {
            return "❌ Твојот предлог е одбиен — " + naslov;
        }
    }

    private String buildRequestBody(String status, String username, String naslov) {
        boolean approved = "APPROVED".equals(status);
        String color = approved ? "#4a7c59" : "#c0392b";
        String icon = approved ? "✅" : "❌";
        String statusText = approved ? "прифатен и додаден на платформата" : "одбиен";

        return """
                <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #f5ede4; padding: 2rem; border-radius: 1rem;">
                  <div style="background: %s; color: white; padding: 1.5rem; border-radius: 0.75rem; text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">%s</div>
                    <h2 style="margin: 0; font-size: 1.3rem;">Предлогот е %s</h2>
                  </div>
                  <div style="background: white; padding: 1.5rem; border-radius: 0.75rem;">
                    <p>Здраво <strong>%s</strong>,</p>
                    <p>Твојот предлог за <strong>%s</strong> е <strong>%s</strong>.</p>
                    %s
                  </div>
                  <p style="text-align: center; color: #8b6245; font-size: 0.8rem; margin-top: 1.5rem;">
                    © TripNest.mk — Your Travel Guide
                  </p>
                </div>
                """.formatted(color, icon, statusText, username, naslov, statusText,
                approved ? "<p style='color: #4a7c59;'>🏡 Сместувањето е веќе достапно на платформата!</p>" : "");
    }
}