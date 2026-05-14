package mk.ukim.finki.web.backend.web.controller;


import mk.ukim.finki.web.backend.model.Accommodation;
import mk.ukim.finki.web.backend.repository.AccomodationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai-search")
@CrossOrigin(origins = "http://localhost:5173")
public class AISearchController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final AccomodationRepository accommodationRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AISearchController(AccomodationRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    @PostMapping
    public ResponseEntity<Map> search(@RequestBody Map<String, String> body) {
        try {
            String query = body.get("query");
            System.out.println(geminiApiKey);
            List<Accommodation> all = accommodationRepository.findAll();
            List<Map<String, Object>> slim = all.stream().map(a -> {
                Map<String, Object> map = new java.util.HashMap<>();
                map.put("id", a.getId());
                map.put("naslov", a.getNaslov() != null ? a.getNaslov() : "");
                map.put("lokacija", a.getLokacija() != null ? a.getLokacija() : "");
                map.put("cenaOdDen", a.getCenaOdDen() != null ? a.getCenaOdDen() : 0);
                map.put("kapacitet", a.getKapacitet() != null ? a.getKapacitet() : 0);
                map.put("wifi", Boolean.TRUE.equals(a.getWifi()));
                map.put("bazen", Boolean.TRUE.equals(a.getBazen()));
                map.put("spa", Boolean.TRUE.equals(a.getSpa()));
                map.put("parking", Boolean.TRUE.equals(a.getParking()));
                map.put("ljubimci", Boolean.TRUE.equals(a.getLjubimci()));
                map.put("klima", Boolean.TRUE.equals(a.getKlima()));
                map.put("tagovi", a.getTagovi() != null ? a.getTagovi() : Collections.emptyList());
                return map;
            }).toList();

            String accommodationsJson = objectMapper.writeValueAsString(slim);

            String prompt = """
                Ti si asistent za preporaka na smestuvanja vo Makedonija.
                Korisnikot bara: "%s"
                
                Eve gi dostapnite smestuvanja:
                %s
                
                Izberi gi 3-te najsoodvetni i odgovori SAMO so validen JSON vo ovoj format, bez nikakov drug tekst:
                {"ids": [1, 2, 3], "obrazlozenie": "Kratko objasnuvanje na makedonski jazik zosto gi izbrav ovie"}
                """.formatted(query, accommodationsJson);

            // Gemini API request
            String url =
                    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key="
                            + geminiApiKey;


            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(Map.of(
                            "parts", List.of(Map.of("text", prompt))
                    )),
                    "generationConfig", Map.of(
                            "temperature", 0.3,
                            "maxOutputTokens", 500
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    new HttpEntity<>(requestBody, headers),
                    Map.class
            );
            System.out.println(response.getBody());



            // Extract text from Gemini response
            Map responseBody = response.getBody();
            List candidates = (List) responseBody.get("candidates");
            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);
            String text = (String) part.get("text");

            // Clean and parse JSON
            String cleaned = text
                    .replaceAll("(?s)```json", "")
                    .replaceAll("```", "")
                    .trim();
            Map result = objectMapper.readValue(cleaned, Map.class);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}