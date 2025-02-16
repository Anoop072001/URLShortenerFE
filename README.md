# URL Shortener Frontend

This is a **Next.js** frontend for a URL shortener. It allows users to shorten URLs using a backend API and supports custom short URLs.

## 🚀 Features
- Shorten long URLs
- Use custom short URLs
- Error handling for duplicate URLs and network issues
- Responsive UI with Tailwind CSS

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/url-shortener-frontend.git
cd url-shortener-frontend
```

### 2️⃣ Install Dependencies
```sh
yarn install  # or npm install
```

### 3️⃣ Configure API Endpoint
Edit `API_BASE_URL` in `src/config.ts` (or directly in `Home.tsx`) to point to your backend:
```ts
const API_BASE_URL = "https://your-backend-url.com";
```
If running locally, use:
```ts
const API_BASE_URL = "http://localhost:8080";
```

### 4️⃣ Start the Development Server
```sh
yarn dev  # or npm run dev
```
Now, visit `http://localhost:3000` in your browser.

---

## 🔌 Using a Custom Backend
To use this frontend with your own backend:
1. Ensure your backend has a **POST** endpoint at `/shorten`.
2. It should accept a **long URL** and an optional **custom URL**.
3. It must return a valid response, either:
   - JSON: `{ "shortUrl": "https://short.ly/abc123" }`
   - Plain text: `https://short.ly/abc123`
4. If a custom URL is taken, return a meaningful error message.

Example Spring Boot Controller:
```java
@PostMapping("/shorten")
public ResponseEntity<?> shortenUrl(@RequestParam String longUrl, @RequestParam(required = false) String customUrl) {
    try {
        String shortenedUrl = urlService.shortenUrl(longUrl, customUrl);
        return ResponseEntity.ok(shortenedUrl);
    } catch (CustomUrlAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Custom URL already exists");
    }
}
```

---

## 🤝 Contributing
Feel free to fork, improve, and create pull requests.
For major changes, please open an issue first.

---

## 🛠️ Technologies Used
- **Next.js** (React Framework)
- **TypeScript**
- **Axios** (for API requests)
- **Tailwind CSS** (for styling)

---

## 📜 License
This project is open-source under the **MIT License**.

