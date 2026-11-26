# Zdravstveni Dnevnik — React + Firebase

Kompletan početni projekat za aplikaciju za lične zdravstvene evidencije.

## Funkcionalnosti
- Firebase Authentication: registracija, prijava i odjava.
- Firestore: evidencije pregleda, vakcinacija i lekova.
- Podaci su izolovani po Firebase `uid` korisnika.
- Dodavanje, izmena, prikaz i brisanje evidencija.
- Podsetnici za lekove/preglede koriste `react-toastify`; podsetnici su trenutno u localStorage browsera.
- Statistika i grafikon preko Chart.js / react-chartjs-2.
- Responsive UI.
- Firestore Security Rules.

## Pokretanje

### 1. Instaliraj Node.js
Preporučuje se aktuelni LTS Node.js.

### 2. Instaliraj dependencies
```bash
npm install
```

### 3. Kreiraj Firebase projekat
U Firebase Console:
1. Kreiraj projekat.
2. Dodaj Web App.
3. Uključi Authentication → Sign-in method → Email/Password.
4. Kreiraj Firestore Database.
5. Preuzmi web konfiguraciju.

### 4. Podesi `.env`
Kopiraj `.env` u `.env` i popuni vrednosti Firebase web konfiguracije.

### 5. Postavi Firestore rules
U Firebase Console → Firestore → Rules kopiraj sadržaj `firestore.rules`, ili koristi Firebase CLI.

### 6. Pokreni
```bash
npm run dev
```

Otvori URL koji Vite prikaže, obično `http://localhost:5173`.

## Firestore struktura

```text
users/{uid}/healthRecords/{recordId}
```

Primer dokumenta:
```json
{
  "type": "medication",
  "title": "Ibuprofen",
  "date": "2026-11-16",
  "doctor": "",
  "dosage": "400 mg",
  "frequency": "2x dnevno",
  "notes": "Posle jela"
}
```

## Napomena o zdravstvenim podacima
Ovo je obrazovni projekat. Za stvarnu medicinsku aplikaciju potrebne su dodatne mere bezbednosti, privatnosti, audit logovi, kontrola pristupa, enkripcija, backup/retention politika i usklađenost sa relevantnim propisima.
