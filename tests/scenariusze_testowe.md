Scenariusz testowy 1: Walidacja pól obowiązkowych

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Kliknij przycisk "ZAREJESTRUJ" bez wypełniania pól formularza.

Oczekiwany rezultat:

    Wyświetlają się komunikaty błędów dla wszystkich obowiązkowych pól,
    Formularz nie zostaje wysłany.

Scenariusz testowy 2: Poprawne wypełnienie formularza

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Wypełnij wszystkie pola:
        Imię,
        Nazwisko,
        Adres e-mail,
        Hasło,
        Powtórz hasło,
        Data urodzenia,
        Nr telefonu,
        Zaznacz checkbox akceptacji regulaminu,
        Zaznacz checkbox zapisu do newslettera,
    Kliknij przycisk "ZAREJESTRUJ".

Oczekiwany rezultat:

    Formularz zostaje poprawnie wysłany.
    Użytkownik zostaje przekierowany na stronę potwierdzającą rejestrację lub pojawia się komunikat o pomyślnej rejestracji.

Scenariusz testowy 3: Weryfikacja poprawności adresu e-mail.

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Wypełnij pola obowiązkowe, ale w polu "Adres e-mail" wpisz niepoprawny(e) adres(y) (np. "jan.kowalski.com").
    Wypełnij pozostałe obowiązkowe pola i zaznacz checkbox akceptacji regulaminu.
    Kliknij przycisk "ZAREJESTRUJ".

Oczekiwany rezultat:

    Pojawia się komunikat błędu informujący, że wprowadzony adres e-mail jest nieprawidłowy.
    Formularz nie zostaje wysłany.

Scenariusz testowy 4: Niezgodność haseł.

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Wypełnij wszystkie obowiązkowe pola, ale w polach "Hasło" i "Powtórz hasło" wpisz różne wartości (np. "Haslo123" i "Haslo321").
    Zaznacz checkbox akceptacji regulaminu.
    Kliknij przycisk "ZAREJESTRUJ".

Oczekiwany rezultat:

    Pojawia się komunikat błędu informujący, że hasła muszą być identyczne.
    Formularz nie zostaje wysłany.

Scenariusz testowy 5: Weryfikacja poprawności numeru telefonu

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Wypełnij pola obowiązkowe, ale w polu "Telefon" wpisz niepoprawny numer (np. "safkl23595@#$").
    Wypełnij pozostałe obowiązkowe pola i zaznacz checkbox akceptacji regulaminu.
    Kliknij przycisk "ZAREJESTRUJ".

Oczekiwany rezultat:

    Pojawia się komunikat błędu informujący, że wprowadzony adres e-mail jest nieprawidłowy.
    Formularz nie zostaje wysłany.

Scenariusz testowy 6: Rejestracja z wykorzystaniem wyłącznie pól obowiązkowych.

Kroki:

    Otwórz stronę z formularzem rejestracji.
    Wypełnij wszystkie obowiązkowe pola oraz opcjonalne pole języka (wybierz np. "Polski") i numeru telefonu (np. "123456789").
    Zaznacz checkbox akceptacji regulaminu.
    Kliknij przycisk "ZAREJESTRUJ".

Oczekiwany rezultat:

    Formularz zostaje poprawnie wysłany z uwzględnieniem wprowadzonych opcjonalnych danych.
    Użytkownik zostaje przekierowany na stronę potwierdzającą rejestrację lub pojawia się komunikat o pomyślnej rejestracji.

Uwagi:

    Scenariusze testowe powinny uwzględniać różne kombinacje danych wejściowych, aby upewnić się, że formularz działa poprawnie w każdych warunkach.
    Testy powinny również obejmować sytuacje, takie jak brak zgody na regulamin, co powinno uniemożliwić wysłanie formularza.
