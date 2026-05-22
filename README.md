# 🧭 TripNest.mk — Your Travel Guide

> Платформа за откривање на најдобрите дестинации, вкусови и искуства низ Македонија.


---

## 📋 Содржина

- [За проектот](#за-проектот)
- [Функционалности](#функционалности)
- [Tech Stack](#tech-stack)
- [Архитектура](#архитектура)
- [Инсталација](#инсталација)
- [API Документација](#api-документација)
- [База на податоци](#база-на-податоци)
- [Скриншоти](#скриншоти)

---

## 🏔️ За проектот

TripNest.mk е full-stack веб апликација која им овозможува на корисниците да истражуваат, резервираат и рецензираат сместувања, атракции и гастрономски места низ Македонија. Платформата вклучува AI-базирано пребарување кое разбира природен јазик.

---

## ✨ Функционалности

### 👤 Корисници
- Регистрација и најава со JWT автентикација
- Уникатност по email адреса
- Улоги: `USER` и `ADMIN`
- При првото најавување корисникот добива улога `USER`

### 🏡 Сместување
- Преглед на сместувања со слики, опис, цена и amenities
- Филтрирање по локација, цена и погодности (WiFi, базен, СПА, паркинг...)
- Carousel на слики за секое сместување
- Интерактивен календар на достапност
- Резервации со датуми, возрасни и деца
- Email нотификации при одобрување/одбивање на резервација
- Рецензии и оценки (1-5 ⭐)

### 🍽️ Гастрономија
- Преглед на ресторани и кафулиња
- Филтрирање по локација

### 🏔️ Атракции
- Преглед на природни и културни атракции
- Филтрирање по локација и цена

### 🤖 AI Пребарување
- Природен јазик пребарување за сместувања
- Интегрирано со Google Gemini API
- Враќа 3 најсоодветни препораки со образложение

### 📬 Контакт
- Форма за пораки до администраторот
- Зачувување на пораки во база

### ⚙️ Admin Панел
- Управување со резервации (одобри/одбиј)
- Управување со предлози за нови сместувања
- Преглед и управување со контакт пораки
- Директно додавање на сместувања

---

## 🛠️ Tech Stack

### Backend
| Технологија | Верзија | Опис |
|-------------|---------|------|
| Java | 21 | Програмски јазик |
| Spring Boot | 3.x | Backend framework |
| Spring Security | 6.x | Автентикација и авторизација |
| JWT | 0.11.5 | Token-based auth |
| Spring Data JPA | 3.x | ORM |
| PostgreSQL | 15+ | Релациска база |
| Flyway | 9.x | Database migrations |
| Lombok | latest | Boilerplate reduction |
| JavaMailSender | - | Email испраќање |
| Google Gemini API | 2.0 Flash | AI пребарување |

### Frontend
| Технологија | Верзија | Опис |
|-------------|---------|------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool |
| React Router | 6.x | Client-side routing |
| Zustand | 4.x | State management |
| Axios | 1.x | HTTP клиент |
| Font Awesome | 6.5 | Иконки |
| React DatePicker | latest | Избор на датуми |

---

## 🏗️ Архитектура

```
tripnest/
├── backend/                          # Spring Boot апликација
│   ├── src/main/java/
│   │   └── mk/ukim/finki/web/backend/
│   │       ├── config/               # SecurityConfig, JwtUtil, JwtAuthFilter
│   │       ├── model/                # JPA ентитети
│   │       │   ├── Accommodation.java
│   │       │   ├── Attraction.java
│   │       │   ├── Gastronomy.java
│   │       │   ├── User.java
│   │       │   ├── Reservation.java
│   │       │   ├── Review.java
│   │       │   ├── ContactMessage.java
│   │       │   └── enums/
│   │       ├── repository/           # JPA репозитории
│   │       ├── service/              # Service интерфејси
│   │       │   └── impl/             # Service имплементации
│   │       └── web/                  # REST контролери
│   └── src/main/resources/
│       ├── application.properties
│       └── db/migration/             # Flyway миграции V0–V11
│
└── frontend/                         # React апликација
    └── src/
        ├── api/                      # Axios повици
        ├── components/               # Повторливи компоненти
        │   ├── Navbar.jsx
        │   ├── Card.jsx
        │   ├── ImageCarousel.jsx
        │   ├── AISearch.jsx
        │   ├── HomeReviews.jsx
        │   └── ...
        ├── pages/                    # Страни
        │   ├── Home.jsx
        │   ├── AccommodationDetail.jsx
        │   ├── AdminPage.jsx
        │   ├── ContactPage.jsx
        │   └── ...
        ├── store/                    # Zustand stores
        └── hooks/                    # Custom hooks
```

---

## 🚀 Инсталација

### Предуслови
- Java 21+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.8+

### Backend

```bash
# Клонирај го репозиториумот
git clone https://github.com/username/tripnest.git
cd tripnest/backend

# Конфигурирај application.properties
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Уреди го `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tripnest
spring.datasource.username=твој_username
spring.datasource.password=твоја_лозинка

spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=твој@gmail.com
spring.mail.password=твој_app_password

gemini.api.key=твојот_gemini_api_key

spring.jackson.serialization.write-dates-as-timestamps=false
```

```bash
# Стартувај го backend-от
mvn spring-boot:run
```

Backend ќе биде достапен на `http://localhost:8080`

### Frontend

```bash
cd tripnest/frontend

# Инсталирај зависности
npm install

# Стартувај dev server
npm run dev
```

Frontend ќе биде достапен на `http://localhost:5173`

### База на податоци

```sql
-- Создај база
CREATE DATABASE tripnest;
```

Flyway автоматски ќе ги изврши миграциите при стартување.

---

## 📡 API Документација

### Auth
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| POST | `/api/auth/register` | Јавен | Регистрација |
| POST | `/api/auth/login` | Јавен | Најава |

### Сместување
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| GET | `/api/smestuvanja` | Јавен | Сите сместувања |
| GET | `/api/smestuvanja/{id}` | Јавен | Едно сместување |
| GET | `/api/smestuvanja/{id}/sliki` | Јавен | Слики |
| POST | `/api/smestuvanja` | ADMIN | Додај сместување |
| PUT | `/api/smestuvanja/{id}` | ADMIN | Ажурирај |
| DELETE | `/api/smestuvanja/{id}` | ADMIN | Избриши |

### Резервации
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| POST | `/api/reservations` | USER | Резервирај |
| GET | `/api/reservations/my` | USER | Моите резервации |
| GET | `/api/reservations/booked-dates/{id}` | Јавен | Зафатени датуми |
| GET | `/api/reservations` | ADMIN | Сите резервации |
| PUT | `/api/reservations/{id}/status` | ADMIN | Одобри/Одбиј |

### Рецензии
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| GET | `/api/smestuvanja/{id}/reviews` | Јавен | Рецензии |
| GET | `/api/smestuvanja/{id}/reviews/avg` | Јавен | Просечна оценка |
| POST | `/api/smestuvanja/{id}/reviews` | USER | Додај рецензија |
| DELETE | `/api/smestuvanja/{id}/reviews/{rid}` | USER | Избриши своја |
| GET | `/api/reviews/latest` | Јавен | Најнови рецензии |

### AI Пребарување
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| POST | `/api/ai-search` | Јавен | AI препораки |

### Контакт
| Метод | Endpoint | Auth | Опис |
|-------|----------|------|------|
| POST | `/api/contact` | Јавен | Испрати порака |
| GET | `/api/contact` | ADMIN | Сите пораки |
| PUT | `/api/contact/{id}/procitana` | ADMIN | Означи прочитана |
| DELETE | `/api/contact/{id}` | ADMIN | Избриши |

---

## 🗄️ База на податоци

### Миграции (Flyway)

| Верзија | Опис |
|---------|------|
| V0 | Креирање на `gastronomija` и `gastronomija_tagovi` |
| V1 | Insert на гастрономски места |
| V2 | Insert на тагови за гастрономија |
| V3 | Креирање на `reservations` и `accommodation_requests` |
| V4 | Amenities колони за сместување |
| V5 | Update на amenities и адреси |
| V6 | Табели за слики (`smestuvanje_sliki`, `gastronomija_sliki`, `atrakcija_sliki`) |
| V7 | Insert на слики за сместување |
| V8 | Insert на слики за гастрономија и атракции |
| V9 | Креирање на `reviews` табела |
| V10 | Креирање на `contact_messages` табела |
| V11 | Unique constraint на email |

### ER Дијаграм (главни релации)

```
users ──────────────── reservations ─────── smestuvanja
  │                         │                    │
  │                   accommodation_requests      │── smestuvanje_tagovi
  │                                               │── smestuvanje_sliki
  └── reviews ──────────────────────────────────┘

gastronomija ─── gastronomija_tagovi
             └── gastronomija_sliki

atrakcii ─── atrakcija_tagovi
         └── atrakcija_sliki

contact_messages
```

---

## 🌐 Деплој

### Environment Variables за продукција

```properties
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/tripnest
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
GEMINI_API_KEY=key
SPRING_MAIL_PASSWORD=app_password

# Frontend — ажурирај baseURL во src/api/axios.js
VITE_API_URL=https://api.tripnest.mk
```

---

## 👩‍💻 Автор

Развиено со љубов за Македонија. Дел од проектна задача по предмет Веб Програмирање на Факултетот за информатички науки и компјутерско инженерство.

---
