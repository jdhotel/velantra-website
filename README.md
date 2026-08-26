# Vilva Boutique Hotel Website

An elegant, premium, and fully responsive website designed for **Vilva**, a boutique luxury hotel located in Arakkonam, Tamil Nadu, India. 

The website has been styled with a warm neutral palette inspired by high-end hospitality brands like *The Park Hotels*, utilizing rich **Burnt Orange** accents, deep **Espresso Dark** backgrounds, and welcoming **Peach-Cream** tones.

---

## 🏨 Hotel Overview & Capacity
- **Accommodations**: 18 guest rooms divided into:
  - **Standard**: Functional, modern workspace, queen bed.
  - **Deluxe**: Spacious, comfortable lounge area, city view, king bed.
  - **Super Deluxe**: Ultimate luxury, open-plan layout, private butler availability, separate living room.
- **Dining**: *The Russet Bistro* (48-seat capacity premium restaurant serving fine Indian and Continental cuisine).
- **Events**: *The Imperial Ballroom* (150-seat capacity versatile banquet hall for corporate conferences, weddings, and family meets).

---

## ✨ Features & Interactivity

1. **Sticky Navigation & Header**: The minimalist navigation transitions to a solid background and soft drop shadow on scroll. Features an integrated mobile hamburger toggle.
2. **Hero & Date-Locked Booking Bar**: High-resolution atmospheric banner displaying an interactive booking widget. Automatically sets check-in/out inputs (tomorrow and day-after) and locks selections to future dates.
3. **Interactive Room Reservations**: Selecting a room opens a checkout summary modal populated with the room class, date range, nights, and guest details.
4. **Bistro Table & Banquet Event Booking**: Integrated forms inside modals for table bookings and banquet quotes.
5. **Filterable Media Gallery**: Responsive CSS Grid displaying rooms, dining, and venue assets. Includes active category filtering and an overlay lightbox slideshow.
6. **Local Destination Guide**: Curated landmarks around Arakkonam (Tiruttani Murugan Temple, Sholinghur Narasimha Temple, Kanchipuram) with estimated travel times.
7. **Testimonials Slider**: An auto-rotating review carousel showing guest reviews.
8. **Interactive Success Feedback**: Form submissions prevent page reloads, validate inputs, clear fields, and display styled toast alerts.
9. **SEO Optimized**: Standardized page hierarchy (`h1`-`h6`), descriptive meta tags, image alt text, and embedded **JSON-LD Schema Markup** (`LodgingBusiness`) for search engine visibility.

---

## 🎨 Design System & Colors

- **Primary Accent (Burnt Orange)**: `#CC4E00` (buttons, icons, labels, tags, active borders)
- **Secondary Dark (Espresso Dark)**: `#26150B` (modals, inputs, footer background, dark text)
- **Secondary Medium (Muted Espresso)**: `#351F13` (dark cards)
- **Primary Background (Off-White)**: `#FDFBF7` (main background)
- **Secondary Background (Peach-Cream)**: `#F9F3EE` (alternate sections, form card backdrops)
- **Typography**:
  - *Playfair Display* (luxury serif) for prominent hospitality headers.
  - *Inter* (sans-serif) for body text and labels.

---

## 📁 File Structure
```bash
├── index.html          # Core semantic structure and JSON-LD schema metadata
├── styles.css          # Design system variables, responsive grids, overlays, and animations
├── app.js              # Viewport reveal triggers, form validation, modal controls, and filters
├── README.md           # Documentation and startup instructions
├── .gitignore          # File exclusions to prevent committing secret keys
└── images/             # High-quality visual assets
    ├── hero_lobby.jpg
    ├── standard_room.jpg
    ├── deluxe_room.jpg
    ├── suite_room.jpg
    ├── restaurant_dining.jpg
    └── banquet_hall.jpg
```

---

## 🚀 Getting Started Locally

Since the project is built on Vanilla HTML5, CSS3, and ES6+ Javascript, there are no build steps or bundler dependencies required.

### Serving with Python
To run the project over a local server and test date/modal calculations cleanly, run the following command in the project root:
```bash
python3 -m http.server 8000
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.
