# 🏆 QuickCourt – Local Sports Booking Platform

QuickCourt is a full-stack web application that enables sports enthusiasts to discover and book local sports facilities like badminton courts, turf grounds, and tennis tables. The platform connects users, facility owners, and admins, ensuring seamless booking, facility management, and community engagement.

---

## 📖 Table of Contents

1. [✨ Features](#-features)
   - [👤 User Role](#-user-role)
   - [🏟️ Facility Owner Role](#️-facility-owner-role)
   - [🛠️ Admin Role](#️-admin-role)
2. [🖥️ Tech Stack](#-tech-stack)
3. [🚀 Installation](#-installation)
4. [📸 Mockups & UI](#-mockups--ui)
5. [📂 Project Structure](#-project-structure)
6. [🔮 Future Enhancements](#-future-enhancements)
7. [🤝 Contributing](#-contributing)
8. [📜 License](#-license)

---

## ✨ Features

### 👤 User Role

- **🔑 Authentication:** Email + Password login, OTP verification on signup
- **🏠 Home Page:**
  - Welcome banner / carousel
  - Quick access to popular venues & sports
- **📍 Venues Page:**
  - List of all approved facilities
  - Search & filters: sport type, price, venue type, rating
  - Pagination
  - Venue card shows: name, sport type(s), price, location, rating
- **🏟️ Single Venue Page:**
  - Full details (name, description, address, amenities, gallery, reviews)
  - “Book Now” action
- **⏰ Court Booking Page:**
  - Select court & time slot
  - View pricing & confirm booking
  - Simulated payment flow
  - Redirect to My Bookings
- **📑 My Bookings Page:**
  - List of all bookings
  - Booking details: venue, sport, court, date/time, status
  - Cancel option (if future)
  - Filters by date / status
- **🙍 Profile Page:**
  - View & edit user info
  - Tabs: My Bookings

---

### 🏟️ Facility Owner Role

- **📊 Dashboard:**
  - KPIs: total bookings, active courts, earnings (simulated)
  - Booking calendar
  - Charts: booking trends, earnings summary, peak booking hours
- **🏢 Facility Management:**
  - Add/edit facility details (name, location, description, sports, amenities, photos)
- **🏓 Court Management:**
  - Court name, sport type, pricing/hour, operating hours
  - Edit/delete courts
- **⏱️ Time Slot Management:**
  - Set court availability
  - Block slots for maintenance
- **📅 Booking Overview Page:**
  - Upcoming & past bookings
  - Details: user, court, time, status
- **👤 Profile Page:**
  - View & edit owner details

---

### 🛠️ Admin Role

- **📊 Dashboard:**
  - Global stats: users, facility owners, bookings, active courts
  - Charts: booking activity, user trends, facility approvals, most active sports, earnings
- **✅ Facility Approval:**
  - Review pending registrations
  - Approve/reject with comments
  - View submitted details & photos
- **👥 User Management:**
  - List all users & owners
  - Search/filter by role or status
  - Actions: ban/unban, view booking history
- **⚖️ Reports & Moderation (optional):**
  - View user reports
  - Take action on flagged facilities/users
- **👤 Profile Page:**
  - Admin profile & basic info update

---

## 🖥️ Tech Stack

**Frontend:**

- ⚛️ React.js + Styled Components / TailwindCSS
- React Router DOM
- Chart.js / Recharts

**Backend:**

- Node.js + Express
- REST APIs

**Database:**

- MongoDB (or SQL alternative)

**Others:**

- JWT Authentication
- Cloud Storage (for images)
- Deployment: Vercel / Netlify (frontend), Render / AWS / Heroku (backend)

---

## 🚀 Installation

```bash
# Clone repo
git clone https://github.com/your-username/quickcourt.git
cd quickcourt

# Install backend dependencies
cd backend
npm install
npm start

# Install frontend dependencies
cd frontend
npm install
npm run dev
```

## 📞 Looking for Frontend Contributors

We are looking for talented **frontend developers** to help build and enhance the QuickCourt user interface. If you are skilled in **React.js, TailwindCSS/Styled Components, and responsive design**, we would love to collaborate with you!

**Contact:** Kartikeya Sharma – kartikeya.anjul@gmail.com
