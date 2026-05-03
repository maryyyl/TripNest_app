CREATE TABLE gastronomija (
                              id           BIGSERIAL PRIMARY KEY,
                              naslov       VARCHAR(500) NOT NULL,
                              lokacija     VARCHAR(255),
                              status       VARCHAR(100),
                              opis         TEXT,
                              link         VARCHAR(1000),
                              slika        VARCHAR(1000),
                              created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
                              updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE gastronomija_tagovi (
                                     gastronomija_id BIGINT NOT NULL REFERENCES gastronomija(id) ON DELETE CASCADE,
                                     tag             VARCHAR(100) NOT NULL
);



INSERT INTO gastronomija (id, naslov, lokacija, status, opis, link, slika) VALUES
                                                                               (1, 'Ресторан Иц-Иц: Смрдлива Вода (Здрава Вода) Кожуф', 'Гевгелија', 'СУПЕР ДОМАЌИН', 'Ресторан Иц-Иц во природата на Здрава Вода (Кожуф), познат по свежата планинска храна и автентичната атмосфера. Идеален за одмор во природа со традиционална македонска кујна.', 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf', 'https://cdn.kajak.mk/static/6d2b77f9-b043-577f-ad38-2a0ee3cca326.jpg'),
                                                                               (2, 'Ловен дом Берово', 'Берово', 'СУПЕР ДОМАЌИН', 'Ловен дом во Берово со традиционален амбиент и специјалитети од дивеч и планинска кујна. Автентично место за гурмани кои сакаат да ги вкусат шумските деликатеси.', 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo', 'https://cdn.kajak.mk/static/018bf850-39ef-d17c-0663-3622320f0e2a.jpg'),
                                                                               (3, 'Damast Bar: Охрид', 'Охрид', 'СУПЕР ДОМАЌИН', 'Damast Bar во Охрид — елегантен бар со богата понуда на пијалоци и коктели, идеален за вечерен излез крај езерото.', 'https://kajak.mk/gastronomija/damast-bar-ohrid', 'https://cdn.kajak.mk/static/ea2cc152-2c0b-9a81-13c8-74af8cbe9dba.jpg'),
                                                                               (4, 'Ресторан Evropa Garden: Ново Село, Гостивар', 'Гостивар', 'СУПЕР ДОМАЌИН', 'Ресторан Европа Гарден во Гостивар нуди разновидно мени во пријатна надворешна средина. Добар избор за семејни вечери и пријателски дружења.', 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar', 'https://cdn.kajak.mk/static/efc5698f-0c41-994c-e836-4081a5d39a1b.jpg'),
                                                                               (5, 'Pionerski Book Bar: Битола', 'Битола', 'СУПЕР ДОМАЌИН', 'Пионерски Book Bar во Битола — кафуле со богата колекција книги и опуштена атмосфера. Идеално место за читање, работа и уживање во кафе.', 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola', 'https://cdn.kajak.mk/static/9d086a3b-e796-ca3d-c6a4-a895962890f1.jpg'),
                                                                               (6, 'Елитен Етно Ресторан „Рибилимус“ – Глуво', 'Скопје', 'СУПЕР ДОМАЌИН', 'Гастрономска понуда во Скопје — ресторан со разновидно мени и современ амбиент во главниот град.', 'https://kajak.mk/gastronomija/2d8d3f9b-etno-restoran-ribilimus-selo-gluvo', 'https://cdn.kajak.mk/static/296dd67c-4e17-740a-d01f-82cd646ad9a9.jpg'),
                                                                               (7, 'Ресторан Златина: Македонска Каменица', 'Македонска Каменица', 'СУПЕР ДОМАЌИН', 'Ресторан во Македонска Каменица со домашна и традиционална македонска кујна. Пријатно место за ручек или вечера во мирна средина.', 'https://kajak.mk/gastronomija/restoran-zlatina-makedonska-kamenica', 'https://cdn.kajak.mk/static/19fa2849-96f6-3c76-fc0d-6004908240e5.jpg'),
                                                                               (8, '„Ristorante Duotto“ во Велес', 'Велес', 'НОВО', 'Ресторан во Велес со традиционална понуда и домашна атмосфера. Добра опција за ручек при поминување низ градот.', 'https://kajak.mk/gastronomija/ristorante-duotto-veles', 'https://cdn.kajak.mk/static/8ac58ad7-b437-9270-9875-9c10aa6a30a7.webp'),
                                                                               (9, 'Твој Крап Бистро', 'Велес', 'НОВО', 'Уште еден одличен ресторан во Велес со разновидна понуда на јадења и пријатна средина за семејно дружење.', 'https://kajak.mk/gastronomija/a8900dfc-tvoj-krap-bistro', 'https://cdn.kajak.mk/static/853aa807-1fdb-a379-3e60-2220f26703f4.jpg'),
                                                                               (10, 'Ресторан ЕТНО САЛАШ – Росоман', 'Кавадарци', NULL, 'Ресторан во Кавадарци — во срцето на македонскиот винарски регион, совршен за дегустација на локални вина и традиционална кујна.', 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman', 'https://cdn.kajak.mk/static/3d33534a-3953-5b3d-4c3e-5f57704764c3.webp'),
                                                                               (11, 'Ресторан Бохемија', 'Кочани', NULL, 'Ресторан во Кочани со домашна кујна и пријатна атмосфера, познат по специјалитетите со кочански ориз.', 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci', 'https://cdn.kajak.mk/static/209a9dcf-177f-f069-8018-84ae8450d352.webp'),
                                                                               (12, 'Forum Kitchen & Bar - Кичево', 'Кичево', NULL, 'Ресторан во Кичево со традиционална македонска понуда и пријатен амбиент за семејни оброци.', 'https://kajak.mk/gastronomija/forum-kitchen-bar-kichevo', 'https://cdn.kajak.mk/static/7d86a226-e14f-bc03-9998-29a6788f3171.webp'),
                                                                               (13, 'Lounge Bar Bakardi во Кичево', 'Кичево', NULL, 'Друг ресторан во Кичево со разновидно мени и добра домашна кујна, погоден за пријателски и семејни излези.', 'https://kajak.mk/gastronomija/lounge-bar-bakardi-vo-kichevo', 'https://cdn.kajak.mk/static/a647f82f-dd8b-ed74-d483-3d72b88dc6a0.webp'),
                                                                               (14, 'Санта Доменика Ресторан - Бања Света Недела: Катланово', 'Скопје', NULL, 'Ресторан во Скопје со современ концепт и богата понуда на интернационални и македонски јадења.', 'https://kajak.mk/gastronomija/santa-domenika-restoran-banja-sveta-nedela-katlanovo', 'https://cdn.kajak.mk/static/c1141603-ab9e-c5cc-c120-628627898ca8.webp'),
                                                                               (15, 'Ресторан Оаза во Охрид', 'Охрид', NULL, 'Ресторан во Охрид со прекрасна локација и специјалитети од езерска риба. Задолжителна посета за љубители на рибни јадења.', 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid', 'https://cdn.kajak.mk/static/1b0511f2-cc49-aea3-8adc-bc56078a0f72.webp'),
                                                                               (16, 'Ресторан Рагуза 360', 'Скопје', NULL, 'Ресторан во Скопје со атрактивен ентериер и разновидно мени. Одличен за бизнис ручеци и семејни вечери.', 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje', 'https://cdn.kajak.mk/static/37984049-d806-d06b-0a68-929688ca8a48.webp'),
                                                                               (17, 'Гостилница ДМ: Скопје', 'Скопје', NULL, 'Уште еден гастрономски бисер во Скопје со богата понуда и модерна атмосфера. Совршен за вечерни излези.', 'https://kajak.mk/gastronomija/gostilnica-dm-skopje', 'https://cdn.kajak.mk/static/9bff8bd1-5c47-6b3d-269c-8f62b603e78c.webp'),
                                                                               (18, 'Вила и ресторан Дионис - Лагадин, Охрид', 'Охрид', NULL, 'Ресторан во Охрид со поглед на езерото и специјалитети од локалната охридска кујна. Романтична локација за незаборавни оброци.', 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid', 'https://cdn.kajak.mk/static/73589d12-714f-bc6e-8ebe-8e2728c99976.webp'),
                                                                               (19, 'Primavera Restaurant & Café: Тетово', 'Тетово', NULL, 'Ресторан во Тетово со традиционална и интернационална кујна во пријатна средина. Добра опција за излез во западномакедонскиот град.', 'https://kajak.mk/gastronomija/primavera-restaurant-cafe-tetovo', 'https://cdn.kajak.mk/static/7e38cf90-7a9c-fc82-362f-fd8d5ed28d14.jpg'),
                                                                               (20, 'Ресторан Парк Гиновци: Гиновци, Крива Паланка', 'Крива Паланка', NULL, 'Ресторан во Крива Паланка со домашна кујна и пријатна атмосфера. Одлично место за одмор при патување низ источна Македонија.', 'https://kajak.mk/gastronomija/restoran-park-ginovci-ginovci-kriva-palanka', 'https://cdn.kajak.mk/static/cddc3e04-9a6e-b2eb-ccdf-61c0eb76e133.jpg'),
                                                                               (21, 'The HarbouR Club: Охрид', 'Охрид', NULL, 'Ресторан во Охрид со автентична атмосфера и специјалитети од македонската традиционална кујна. Убава дестинација за гурмани.', 'https://kajak.mk/gastronomija/the-harbour-club-ohrid', 'https://cdn.kajak.mk/static/5306d003-5f20-5e11-c9d8-a846478d93e1.jpg'),
                                                                               (22, 'Ресторан Ан: Скопје', 'Скопје', NULL, 'Ресторан во Скопје со модерен концепт и висококвалитетна понуда. Идеален за деловни ручеци и посебни прилики.', 'https://kajak.mk/gastronomija/restoran-an-skopje', 'https://cdn.kajak.mk/static/65534f4a-f594-2bec-2fde-721e2ead0774.jpg'),
                                                                               (23, 'Ресторан Плаза де Торос: Скопје', 'Скопје', NULL, 'Кафуле или ресторан во Скопје со опуштена атмосфера и разновидна понуда на пијалоци и закуски.', 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje', 'https://cdn.kajak.mk/static/cdc8def3-0989-5f12-67b8-77c121967b47.jpg'),
                                                                               (24, 'Ресторан Премиер Центар: Битола', 'Битола', NULL, 'Ресторан во Битола со традиционална македонска кујна и пријатен амбиент во историскиот дел на градот.', 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola', 'https://cdn.kajak.mk/static/0a36a40f-d13e-32fe-c1bb-15d29f7e0220.jpg'),
                                                                               (25, 'Равена Пица Бар: Битола', 'Битола', NULL, 'Уште еден ресторан во Битола, познат по домашната кујна и топлата атмосфера. Добар избор за излез во Широка Скала.', 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola', 'https://cdn.kajak.mk/static/1a4b45b1-85ff-8820-4417-f1de57170d48.jpg'),
                                                                               (26, 'Република Клуб Ресторан: Кичево', 'Кичево', NULL, 'Ресторан во Кичево со разновидно мени и пријатна средина. Добро место за ручек при истражување на западна Македонија.', 'https://kajak.mk/gastronomija/republika-klub-restoran-kichevo', 'https://cdn.kajak.mk/static/4f759690-3aa4-461f-2af2-06980f284b57.jpg'),
                                                                               (27, 'Ресторан-пицерија Ера: Тетово', 'Тетово', NULL, 'Ресторан во Тетово со богата традиционална кујна. Одлично место за запознавање со тетовската кулинарска традиција.', 'https://kajak.mk/gastronomija/restoran-picerija-era-tetovo', 'https://cdn.kajak.mk/static/7527452f-8fce-1088-6ea7-afdc31c6a2e5.jpg'),
                                                                               (28, 'KØD Steak Bar: Тетово', 'Тетово', NULL, 'Друг ресторан во Тетово со пријатна атмосфера и домашна кујна, погоден за семејни и пријателски дружења.', 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo', 'https://cdn.kajak.mk/static/472dff63-0799-0633-e882-0cb4f3717030.jpg'),
                                                                               (29, 'Sunset Club Restaurant: Претор, Ресен', 'Ресен', NULL, 'Ресторан во Ресен, во близина на Преспанското Езеро, со специјалитети од езерска риба и локални производи.', 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen', 'https://cdn.kajak.mk/static/0ccff974-dbc1-0566-6750-483f9c2ae93f.jpg'),
                                                                               (30, 'Ресторан Балканика- Кај Ефто: Скопје', 'Скопје', NULL, 'Ресторан во Скопје со атрактивна локација и богата понуда. Добро место за вечерни излези и деловни средби.', 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje', 'https://cdn.kajak.mk/static/89b6feb5-b22a-14aa-bbb6-1a91a6ea7cfb.jpg'),
                                                                               (31, 'Ресторан Ив: Скопје', 'Скопје', NULL, 'Ресторан или кафуле во Скопје со модерен концепт и пријатна атмосфера за сите прилики.', 'https://kajak.mk/gastronomija/restoran-iv-skopje', 'https://cdn.kajak.mk/static/f0587b3b-653c-dfd8-e5b7-50c277b2d5b9.jpg'),
                                                                               (32, 'Национален ресторан Мечка: Скопје', 'Скопје', NULL, 'Гастрономски објект во Скопје со богата понуда и современ амбиент. Идеален за сите видови излези во главниот град.', 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje', 'https://cdn.kajak.mk/static/e108a832-9e80-64fe-fc89-fe91134e938d.jpg'),
                                                                               (33, 'Рибен ресторан Пиликатник: Струмица', 'Струмица', NULL, 'Ресторан во Струмица со традиционална македонска кујна и пријатна атмосфера. Одлична дестинација во југоисточна Македонија.', 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica', 'https://cdn.kajak.mk/static/c5a231dc-d68f-42e9-f879-5c95ceb6a61c.jpg'),
                                                                               (34, 'Ресторан Тивко Катче: Гостивар', 'Гостивар', NULL, 'Ресторан во Гостивар со богата традиционална и интернационална понуда. Добро место за ручек при посета на западна Македонија.', 'https://kajak.mk/gastronomija/restoran-tivko-katche-gostivar', 'https://cdn.kajak.mk/static/c55abb23-f430-bbfe-a80d-cd3a91254554.jpg'),
                                                                               (35, 'Ресторан Пелла: Гостивар', 'Гостивар', NULL, 'Уште еден ресторан во Гостивар со пријатна средина и домашна кујна. Препорачано за семејни и пријателски дружења.', 'https://kajak.mk/gastronomija/restoran-pella-gostivar', 'https://cdn.kajak.mk/static/b98f54da-50f5-4ed3-8388-9131e300c410.jpg'),
                                                                               (36, 'Ресторан Playa Vista: Тетово', 'Тетово', NULL, 'Ресторан во Тетово со современ концепт и разновидна понуда. Добра опција за вечерен излез во Тетово.', 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo', 'https://cdn.kajak.mk/static/b6f20d42-7297-e1f8-2e6c-0148a4083e4d.jpg'),
                                                                               (37, 'Ресторан Panorama: Липково, Куманово', 'Куманово', NULL, 'Ресторан во Куманово со традиционална македонска кујна и пријатен амбиент. Добро место за ручек или вечера во северот на Македонија.', 'https://kajak.mk/gastronomija/restoran-panorama-likov-lipkovo-kumanovo', 'https://cdn.kajak.mk/static/62c944ee-484f-6e28-acc5-40900cbe29ec.jpg'),
                                                                               (38, 'Mavrovo Lounge Bar & Restaurant: Маврово', 'Маврово', NULL, 'Ресторан во Маврово со планинска атмосфера и специјалитети во природна средина. Одлично место за јадење по планинарење или скијање.', 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo', 'https://cdn.kajak.mk/static/e8d4d267-eef7-9c58-16f1-eef4fe3d32a9.jpg'),
                                                                               (39, 'Restobar Niko’s : Пробиштип', 'Пробиштип', NULL, 'Ресторан во Пробиштип со домашна и традиционална понуда. Пријатно место за ручек при патување низ источна Македонија.', 'https://kajak.mk/gastronomija/d4911f70-restobar-nikos--probishtip', 'https://cdn.kajak.mk/static/2e90d75f-aa44-eadb-a1f1-fa0ec0f91b93.jpg'),
                                                                               (40, 'TIEMPO Ресторан и Pool Bar: Лешок, Тетово', 'Тетово', NULL, 'Уште еден ресторан во Тетово со богата понуда и пријатна атмосфера за сите прилики.', 'https://kajak.mk/gastronomija/tiempo-restoran-i-pool-bar-leshok-tetovo', 'https://cdn.kajak.mk/static/e2fe3134-9331-5cfe-1094-3fcd4a673858.jpg'),
                                                                               (41, 'Пролет Бар: Кочани', 'Кочани', NULL, 'Ресторан во Кочани со специјалитети и традиционална кујна. Одличен избор за љубители на автентичната македонска гастрономија.', 'https://kajak.mk/gastronomija/prolet-bar-kochani', 'https://cdn.kajak.mk/static/50b62dc2-0fac-539f-2650-2ddc3baaa230.jpg'),
                                                                               (42, 'Гостилница Путник: Битола', 'Битола', NULL, 'Ресторан во Битола со пријатна атмосфера и разновидна понуда. Добра опција за вечерни излези во Манасти.', 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola', 'https://cdn.kajak.mk/static/97a05be5-4ad0-2967-0ab3-60b62b735862.jpg'),
                                                                               (43, 'City In-Хотел и Ресторан: Кочани', NULL, NULL, 'Гастрономски објект со уникатна понуда и специјалитети. Посебно место за љубители на добра храна и пијалоци.', 'https://kajak.mk/gastronomija/city-in-hotel-i-restoran-kochani', 'https://cdn.kajak.mk/static/6cdd1835-48cd-e8f6-3aa8-294ea11b4b45.jpg'),
                                                                               (44, 'Ресторан "Relax": Доброште, Тетово', 'Тетово', NULL, 'Ресторан во Тетово со традиционална понуда и домашна кујна. Препорачано за посета при истражување на Тетовскиот регион.', 'https://kajak.mk/gastronomija/restoran-relax-dobroshte-tetovo', 'https://cdn.kajak.mk/static/3fd18a58-537f-5379-3e7c-ad632819ef40.jpg'),
                                                                               (45, 'Ресторан Профицио: Одри, Тетово', 'Тетово', NULL, 'Кафуле или бар во Тетово со опуштена атмосфера, погодно за кафе, коктели и пријателски дружења.', 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo', 'https://cdn.kajak.mk/static/bea21129-1f08-4754-ad7f-23a9c7fa1481.jpg'),
                                                                               (46, 'Ресторан FOUR: Скопје', 'Скопје', NULL, 'Ресторан во Скопје со богата понуда и модерна атмосфера. Идеален за деловни ручеци и вечерни излези.', 'https://kajak.mk/gastronomija/restoran-four-skopje', 'https://cdn.kajak.mk/static/655906da-4c13-395f-46d5-2073ae8e88a8.jpg'),
                                                                               (47, 'Ресторан "Perfect": Буковиќ, Скопје', 'Скопје', NULL, 'Гастрономски објект во Скопје со разновидна понуда и пријатна средина. Добар избор за сите прилики во главниот град.', 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje', 'https://cdn.kajak.mk/static/ec17127e-6c7d-2902-a8a7-2eddb4f93f3c.jpg'),
                                                                               (48, 'Ресторан Пенелопе: Неготино', 'Неготино', NULL, 'Ресторан во Неготино во срцето на македонскиот винарски регион. Идеално место за дегустација на вина и традиционална кујна.', 'https://kajak.mk/gastronomija/restoran-penelope-negotino', 'https://cdn.kajak.mk/static/04c229f2-cb1d-f0bb-e08f-482f068ff88e.jpg'),
                                                                               (49, 'Ресторан Паце: Кочани', 'Кочани', NULL, 'Ресторан во Кочани со домашна и традиционална кујна. Познат по специјалитетите со кочански ориз и локални производи.', 'https://kajak.mk/gastronomija/restoran-pace-kochani', 'https://cdn.kajak.mk/static/b40642d4-deb6-108a-6815-8e89600270e0.jpg'),
                                                                               (50, 'MONOPOLO- Хотел и Ресторан: Делчево', 'Делчево', NULL, 'Ресторан во Делчево со пријатна атмосфера и традиционална македонска кујна. Добра опција за ручек при патување во Малешевијата.', 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo', 'https://cdn.kajak.mk/static/a3b0e2d2-163b-fec2-b638-3db85c056e0f.jpg'),
                                                                               (51, 'Ресторан Панорама: Делчево', 'Делчево', NULL, 'Уште еден ресторан во Делчево со домашна кујна и топла атмосфера. Препорачано за семејни оброци.', 'https://kajak.mk/gastronomija/restoran-panorama-delchevo', 'https://cdn.kajak.mk/static/6be1ec00-057d-8c6c-ffcb-ca223abc6178.jpg'),
                                                                               (52, 'Ресторан Палас Гарден: Куманово', 'Куманово', NULL, 'Ресторан во Куманово со разновидна понуда и пријатен амбиент. Добро место за излез во северниот дел на Македонија.', 'https://kajak.mk/gastronomija/restoran-palas-garden-kumanovo', 'https://cdn.kajak.mk/static/9a2e96dc-d651-7b04-26fc-b42c3a6ccdab.jpg'),
                                                                               (53, 'Ресторан Одисеја: Скопје', 'Скопје', NULL, 'Ресторан во Скопје со висококвалитетна понуда и елегантен амбиент. Идеален за посебни прилики и романтични вечери.', 'https://kajak.mk/gastronomija/restoran-odiseja-skopje', 'https://cdn.kajak.mk/static/1d8a7997-5c73-07f4-6a5e-a53327cecb1b.jpg'),
                                                                               (54, 'Ресторан Осоговец: Крива Паланка', 'Крива Паланка', NULL, 'Ресторан во Крива Паланка со домашна македонска кујна. Пријатно место за одмор при патување низ источна Македонија.', 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka', 'https://cdn.kajak.mk/static/32738557-70d8-bf89-fe9e-a077149f89ff.jpg'),
                                                                               (55, 'Ресторан-Вила Осоговска Куќа: Кочани', 'Кочани', NULL, 'Ресторан во Кочани со разновидна понуда и пријатна атмосфера. Добар избор за ручек или вечера во Кочани.', 'https://kajak.mk/gastronomija/restoran-vila-osogovska-kukja-kochani', 'https://cdn.kajak.mk/static/0cd3acbc-a7ae-eda0-efd9-7c3023d26a5e.jpg'),
                                                                               (56, 'Ресторан Острово: Охрид', 'Охрид', NULL, 'Ресторан во Охрид со специјалитети од охридска пастрмка и езерска риба. Задолжително место за посета при секој престој во Охрид.', 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid', 'https://cdn.kajak.mk/static/18e7c33c-8e82-18eb-f2c0-403054dca11c.jpg'),
                                                                               (57, 'Ресторан Шизик: Македонска Каменица', 'Македонска Каменица', NULL, 'Ресторан во Македонска Каменица со домашна кујна и пријатна атмосфера во мирната источна Македонија.', 'https://kajak.mk/gastronomija/restoran-shizik-makedonska-kamenica', 'https://cdn.kajak.mk/static/d35bcd94-65ce-39e2-e9aa-811a8891b785.jpg'),
                                                                               (58, 'Ресторан Мотел Мерак: Луковица, Македонска Каменица', 'Македонска Каменица', NULL, 'Уште еден ресторан во Македонска Каменица со традиционална понуда и добра домашна кујна.', 'https://kajak.mk/gastronomija/restoran-motel-merak-lukovica-makedonska-kamenica', 'https://cdn.kajak.mk/static/0bb86d89-20bf-e4bc-f325-b457439bbbc2.jpg'),
                                                                               (59, 'Ресторан Трофта: Радуша, Скопје', 'Скопје', NULL, 'Ресторан во Скопје со модерна понуда и атрактивен ентериер. Одличен избор за вечерни излези и деловни средби.', 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje', 'https://cdn.kajak.mk/static/04603582-f216-aec7-4b85-8f08cd896cd9.jpg'),
                                                                               (60, 'Ресторан Манастирска пештера: Скопје', 'Скопје', NULL, 'Гастрономски објект во Скопје со пријатна атмосфера и разновидна понуда за сите прилики.', 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje', 'https://cdn.kajak.mk/static/0d65a4b4-37e1-f0e7-8910-65ed5d0119d9.jpg');
SELECT setval('gastronomija_id_seq', (SELECT MAX(id) FROM gastronomija));

INSERT INTO gastronomija_tagovi (gastronomija_id, tag)
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'priroda' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'planina' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ic-ic-smrdliva-voda-zdrava-voda-kozhuf'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'lovska_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'priroda' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'planina' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/c2141a37-loven-dom-berovo'
UNION ALL
SELECT id, 'bar' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'kokteli' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/damast-bar-ohrid'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar'
UNION ALL
SELECT id, 'gradina' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-evropa-garden-novo-selo-gostivar'
UNION ALL
SELECT id, 'kafule' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'bar' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'knigi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'kulturno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'relaksacija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/pionerski-book-bar-bitola'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/2d8d3f9b-etno-restoran-ribilimus-selo-gluvo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/2d8d3f9b-etno-restoran-ribilimus-selo-gluvo'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/2d8d3f9b-etno-restoran-ribilimus-selo-gluvo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/2d8d3f9b-etno-restoran-ribilimus-selo-gluvo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-zlatina-makedonska-kamenica'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-zlatina-makedonska-kamenica'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-zlatina-makedonska-kamenica'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-zlatina-makedonska-kamenica'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ristorante-duotto-veles'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ristorante-duotto-veles'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ristorante-duotto-veles'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ristorante-duotto-veles'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/a8900dfc-tvoj-krap-bistro'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/a8900dfc-tvoj-krap-bistro'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/a8900dfc-tvoj-krap-bistro'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/a8900dfc-tvoj-krap-bistro'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman'
UNION ALL
SELECT id, 'vino' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-etno-salash-rosoman'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-bohemija-zrnovci'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/forum-kitchen-bar-kichevo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/forum-kitchen-bar-kichevo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/forum-kitchen-bar-kichevo'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/forum-kitchen-bar-kichevo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/lounge-bar-bakardi-vo-kichevo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/lounge-bar-bakardi-vo-kichevo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/lounge-bar-bakardi-vo-kichevo'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/lounge-bar-bakardi-vo-kichevo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/santa-domenika-restoran-banja-sveta-nedela-katlanovo'
UNION ALL
SELECT id, 'internacionalna_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/santa-domenika-restoran-banja-sveta-nedela-katlanovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/santa-domenika-restoran-banja-sveta-nedela-katlanovo'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/santa-domenika-restoran-banja-sveta-nedela-katlanovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'riba' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-oaza-vo-ohrid'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje'
UNION ALL
SELECT id, 'biznis' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-raguza-360-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-dm-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-dm-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-dm-skopje'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-dm-skopje'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-dm-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'riba' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-dionis-lagadin-ohrid'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/primavera-restaurant-cafe-tetovo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/primavera-restaurant-cafe-tetovo'
UNION ALL
SELECT id, 'internacionalna_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/primavera-restaurant-cafe-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/primavera-restaurant-cafe-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-park-ginovci-ginovci-kriva-palanka'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-park-ginovci-ginovci-kriva-palanka'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-park-ginovci-ginovci-kriva-palanka'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-park-ginovci-ginovci-kriva-palanka'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/the-harbour-club-ohrid'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/the-harbour-club-ohrid'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/the-harbour-club-ohrid'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/the-harbour-club-ohrid'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/the-harbour-club-ohrid'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-an-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-an-skopje'
UNION ALL
SELECT id, 'luksuzno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-an-skopje'
UNION ALL
SELECT id, 'biznis' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-an-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-an-skopje'
UNION ALL
SELECT id, 'kafule' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje'
UNION ALL
SELECT id, 'relaksacija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje'
UNION ALL
SELECT id, 'zakuski' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje'
UNION ALL
SELECT id, 'prijatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-plaza-de-toros-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola'
UNION ALL
SELECT id, 'istorija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-premier-centar-bitola'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/ravena-pica-bar-bitola'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/republika-klub-restoran-kichevo'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/republika-klub-restoran-kichevo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/republika-klub-restoran-kichevo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/republika-klub-restoran-kichevo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-picerija-era-tetovo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-picerija-era-tetovo'
UNION ALL
SELECT id, 'tradicija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-picerija-era-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-picerija-era-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/kd-steak-bar-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'riba' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'lokalni_proizvodi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/sunset-club-restaurant-pretor-resen'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje'
UNION ALL
SELECT id, 'biznis' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-balkanika-kaj-efto-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-iv-skopje'
UNION ALL
SELECT id, 'kafule' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-iv-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-iv-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-iv-skopje'
UNION ALL
SELECT id, 'relaksacija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-iv-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/nacionalen-restoran-mechka-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/riben-restoran-pilikatnik-strumica'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-tivko-katche-gostivar'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-tivko-katche-gostivar'
UNION ALL
SELECT id, 'internacionalna_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-tivko-katche-gostivar'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-tivko-katche-gostivar'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pella-gostivar'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pella-gostivar'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pella-gostivar'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pella-gostivar'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pella-gostivar'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-playa-vista-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-likov-lipkovo-kumanovo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-likov-lipkovo-kumanovo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-likov-lipkovo-kumanovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-likov-lipkovo-kumanovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'planina' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'priroda' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'zimsko' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'letno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/mavrovo-lounge-bar-restaurant-mavrovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/d4911f70-restobar-nikos--probishtip'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/d4911f70-restobar-nikos--probishtip'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/d4911f70-restobar-nikos--probishtip'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/d4911f70-restobar-nikos--probishtip'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/tiempo-restoran-i-pool-bar-leshok-tetovo'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/tiempo-restoran-i-pool-bar-leshok-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/tiempo-restoran-i-pool-bar-leshok-tetovo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/tiempo-restoran-i-pool-bar-leshok-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/prolet-bar-kochani'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/prolet-bar-kochani'
UNION ALL
SELECT id, 'tradicija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/prolet-bar-kochani'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/prolet-bar-kochani'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/gostilnica-putnik-bitola'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/city-in-hotel-i-restoran-kochani'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/city-in-hotel-i-restoran-kochani'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/city-in-hotel-i-restoran-kochani'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/city-in-hotel-i-restoran-kochani'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-relax-dobroshte-tetovo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-relax-dobroshte-tetovo'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-relax-dobroshte-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-relax-dobroshte-tetovo'
UNION ALL
SELECT id, 'kafule' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo'
UNION ALL
SELECT id, 'bar' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo'
UNION ALL
SELECT id, 'relaksacija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo'
UNION ALL
SELECT id, 'prijatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-proficio-odri-tetovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-four-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-four-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-four-skopje'
UNION ALL
SELECT id, 'biznis' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-four-skopje'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-four-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje'
UNION ALL
SELECT id, 'grupi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-perfect-bukovikj-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'vino' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-penelope-negotino'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pace-kochani'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pace-kochani'
UNION ALL
SELECT id, 'lokalni_proizvodi' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pace-kochani'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pace-kochani'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-pace-kochani'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/monopolo--hotel-i-restoran-delchevo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-delchevo'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-delchevo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-delchevo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-panorama-delchevo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-palas-garden-kumanovo'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-palas-garden-kumanovo'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-palas-garden-kumanovo'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-palas-garden-kumanovo'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'luksuzno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'pari' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-odiseja-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-osogovec-kriva-palanka'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-vila-osogovska-kukja-kochani'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-vila-osogovska-kukja-kochani'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-vila-osogovska-kukja-kochani'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-vila-osogovska-kukja-kochani'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'riba' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'ezero' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'unikatno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'gastro' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'romantichno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'ohrid' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-ostrovo-ohrid'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-shizik-makedonska-kamenica'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-shizik-makedonska-kamenica'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-shizik-makedonska-kamenica'
UNION ALL
SELECT id, 'mirno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-shizik-makedonska-kamenica'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-motel-merak-lukovica-makedonska-kamenica'
UNION ALL
SELECT id, 'makedonskata_kujna' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-motel-merak-lukovica-makedonska-kamenica'
UNION ALL
SELECT id, 'domashno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-motel-merak-lukovica-makedonska-kamenica'
UNION ALL
SELECT id, 'tradicija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-motel-merak-lukovica-makedonska-kamenica'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje'
UNION ALL
SELECT id, 'moderno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje'
UNION ALL
SELECT id, 'vecher' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje'
UNION ALL
SELECT id, 'biznis' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-trofta-radusha-skopje'
UNION ALL
SELECT id, 'restoran' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje'
UNION ALL
SELECT id, 'grad' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje'
UNION ALL
SELECT id, 'raznovidno_meni' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje'
UNION ALL
SELECT id, 'semejno' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje'
UNION ALL
SELECT id, 'relaksacija' FROM gastronomija WHERE link = 'https://kajak.mk/gastronomija/restoran-manastirska-peshtera-skopje';