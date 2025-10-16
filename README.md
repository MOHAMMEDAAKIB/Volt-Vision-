# EVGuide SL - Smart EV Companion for Sri Lanka 🚗⚡

## Overview

EVGuide SL is a comprehensive web application designed to help Sri Lankans make informed decisions about purchasing electric vehicles (EVs). The platform provides localized information with LKR pricing, charging infrastructure details, and intelligent recommendations tailored to the Sri Lankan market.

## Problem Statement

People in Sri Lanka who want to buy an electrical vehicle (EV) find it hard to make the right decision because information is unclear and not made for local needs. They are confused about costs, charging stations and which EV fits their lifestyle. This slows down electrical vehicle adoption in Sri Lanka.

## Features

### 🔍 **EV Search & Filter**
- Browse 6+ EV models available in Sri Lanka
- Advanced filtering by price, range, brand, type, and availability
- Multiple sorting options (price, range, efficiency)
- Real-time search results with detailed specifications

### 🔄 **Model Comparison**
- Side-by-side comparison of up to 3 EVs
- Compare specifications, features, charging times, and warranties
- Visual comparison table with key metrics
- Easy-to-understand feature breakdowns

### 💰 **Cost Calculator**
- Calculate total cost of ownership over 5 years
- LKR-based pricing with local electricity rates
- Compare EV costs vs petrol vehicles
- Breakdown of purchase price, running costs, maintenance, and insurance
- Cost per kilometer calculation

### 🗺️ **Charging Station Map**
- Interactive map showing 6+ charging stations across Sri Lanka
- Real-time availability information
- Filter by station type (Public/Semi-Public) and charger type (AC/DC Fast)
- Station details including pricing, hours, and amenities
- Find nearest charging stations

### 🤖 **AI Assistant**
- Personalized EV recommendations based on user preferences
- 4-step questionnaire covering budget, daily distance, priorities, and usage
- Intelligent scoring algorithm
- Top 3 EV recommendations with explanations

### 📚 **EV Tips & Guides**
- 8+ practical tips covering buying, charging, maintenance, battery care, and insurance
- 5+ FAQs about EV ownership in Sri Lanka
- Category-based filtering
- Local context and government incentives information

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Leaflet & React-Leaflet** - Interactive maps
- **Lucide React** - Modern icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
Volt-Vision-/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── EVCard.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── SearchEVs.jsx
│   │   │   ├── Compare.jsx
│   │   │   ├── Calculator.jsx
│   │   │   ├── ChargingMap.jsx
│   │   │   ├── AIAssistant.jsx
│   │   │   └── EVTips.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── evCalculations.js
│   │   ├── data/            # Static data
│   │   │   └── evData.js
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # App entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── evController.js
│   │   │   └── chargingController.js
│   │   ├── routes/          # API routes
│   │   │   ├── evRoutes.js
│   │   │   └── chargingRoutes.js
│   │   ├── models/          # Data models
│   │   │   └── data.js
│   │   └── server.js        # Server entry point
│   ├── .env
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### EV Endpoints
- `GET /api/evs` - Get all EVs
- `GET /api/evs/:id` - Get EV by ID
- `GET /api/evs/filter` - Filter EVs (query params: minPrice, maxPrice, type, brand, minRange, availability)
- `GET /api/evs/brands` - Get all brands
- `GET /api/evs/types` - Get all types

### Charging Station Endpoints
- `GET /api/charging` - Get all charging stations
- `GET /api/charging/:id` - Get station by ID
- `GET /api/charging/filter` - Filter stations (query params: type, chargerType)
- `GET /api/charging/nearest` - Find nearest stations (query params: lat, lon, limit)

### Health Check
- `GET /api/health` - API health check

## Key Features Implementation

### 1. LKR Pricing
All prices are in Sri Lankan Rupees (LKR) with proper formatting:
- Purchase prices: LKR 7.2M - 16.5M range
- Charging costs: LKR 30-50 per kWh
- Running cost calculations based on CEB rates

### 2. Local Context
- Import duty information (18-25%)
- Sri Lankan charging network data
- Government incentives information
- Local driving patterns and usage scenarios

### 3. Clean, Modular Architecture
- Component-based React architecture
- Reusable utility functions
- Separation of concerns (components, pages, utils, data)
- RESTful API design
- Environment-based configuration

### 4. Good UX
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation with sticky header
- Loading states and error handling
- Interactive components with hover effects
- Clear visual hierarchy
- Accessible form inputs and buttons

## Data

The application includes comprehensive data for:
- 6 EV models (Tesla, Nissan, BYD, MG, Hyundai, Kia)
- 6 charging stations across Sri Lanka (Colombo, Nugegoda, Kandy, Gampaha)
- 8 practical EV tips
- 5 frequently asked questions

## Future Enhancements

- User authentication and profiles
- Booking system for test drives
- Real-time charging station availability
- Integration with dealership inventory
- EV financing calculator
- Community forum for EV owners
- Mobile app (React Native)
- Advanced AI recommendations using machine learning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Contact

For questions or support, contact: info@evguide.lk

---

Made with ❤️ for Sri Lanka's EV future 🌱
