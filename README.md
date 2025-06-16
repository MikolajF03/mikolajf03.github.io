# Projektowanie Interfejsów Użytkownika

## Projekt

**Autor:** Mikołaj Filipski 37682  
**Link do strony:** [https://mikolajf03.github.io/](https://mikolajf03.github.io/)

## Wstęp

Projekt strony [https://mikolajf03.github.io/](https://mikolajf03.github.io/) to portfolio realizowane na potrzeby przedmiotu **Programowanie Interfejsów Użytkownika**. Celem projektu było zaprojektowanie i wdrożenie nowoczesnego, elastycznego interfejsu użytkownika, dostosowanego do różnych urządzeń (desktop, tablet, mobile).

Strona prezentuje:
- podstawowe informacje o autorze,
- dynamiczną listę projektów pobieranych z API GitHub Microsoftu,
- szczegółowe widoki projektów,
- podstronę „O mnie” z danymi osobistymi i umiejętnościami,
- podstronę „Kontakt” z formularzem.

Szczególną uwagę położono na **responsywność** oraz **intuicyjną nawigację**, co zapewnia komfortowe użytkowanie niezależnie od wielkości ekranu i rodzaju urządzenia.

---

## Opis struktury strony

### Strona główna (`index.html`)
- Wprowadzenie oraz podstawowe informacje o autorze.
- Krótki opis i zachęta do eksploracji zawartości.

### Lista projektów (`lista.html`)
- Pobiera dane z API GitHub Microsoftu.
- Wyświetla projekty w formie:
  - tabeli na desktopie,
  - kafelków na urządzeniach mobilnych i tabletach (2 kolumny na tablecie).
- Umożliwia **filtrowanie**, **sortowanie** oraz **paginację**.

### Szczegóły projektu (`projekt.html`)
- Wyświetla szczegółowe informacje o wybranym projekcie.
- Zawiera tytuł, opis, technologie, linki do repozytorium.
- Możliwe prezentowanie logotypu głównego języka programowania.

### O mnie (`omnie.html`)
- Strona zbudowana z kolumn zawierających informacje o autorze.
- Layout:
  - desktop: 3 kolumny obok siebie,
  - tablet: 2 kolumny u góry, 1 pod spodem,
  - mobile: jedna kolumna.

### Kontakt (`kontakt.html`)
- Formularz kontaktowy umożliwiający wysłanie wiadomości.
- Podstawowa walidacja po stronie klienta.

### Nagłówek i nawigacja (`navbar.html`)
- Stały element na każdej stronie.
- Zawiera:
  - logo,
  - **hamburger menu** na mobile,
  - dynamiczny **moduł pogodowy**,
  - nawigację do podstron.

### Stopka (`footer.html`)
- Widoczna na każdej podstronie.
- Informacje o prawach autorskich.

### JavaScript
- Wszystkie skrypty umieszczone w folderze `js/`.

---

## Technologie użyte przy tworzeniu serwisu

### HTML5
- Semantyczna struktura przy użyciu elementów takich jak `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`.
- Poprawia dostępność i indeksowanie przez wyszukiwarki.

### CSS3
- Wszystkie style zawarte w `style.css`.
- Tworzenie responsywnych layoutów dopasowanych do różnych ekranów.

### JavaScript
- Dynamiczne ładowanie danych z API GitHub.
- Obsługa nawigacji, hamburger menu oraz modułu pogodowego.

---

## API

### GitHub API (Microsoft)
- Służy do pobierania i prezentacji projektów.

### API pogodowe
- Dostarcza aktualne dane pogodowe do modułu w nagłówku.

Dzięki zastosowaniu zewnętrznych API serwis jest **dynamiczny**, **interaktywny** i **aktualny**.

---

## Podsumowanie

W ramach projektu stworzono nowoczesną stronę internetową obejmującą:
- pełen cykl projektowy (mockupy → implementacja → testy → dokumentacja),
- nowoczesne technologie: HTML5, CSS3, JavaScript,
- **modułową strukturę**, ułatwiającą rozbudowę i utrzymanie serwisu,
- **responsywność** – od desktopów po smartfony,
- integrację z zewnętrznymi API (GitHub, pogoda).

Strona została przetestowana w różnych przeglądarkach, co potwierdziło jej poprawne działanie i zgodność ze standardami.

---

📁 **Foldery i pliki**
- `index.html`, `lista.html`, `projekt.html`, `omnie.html`, `kontakt.html`
- `navbar.html`, `footer.html`
- `style.css`
- `/js/`

---

**Autor:** Mikołaj Filipski  
**Numer indeksu:** 37682
