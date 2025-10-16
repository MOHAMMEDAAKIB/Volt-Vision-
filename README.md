# Volt-Vision 🚗⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> Empowering Sri Lankans to make informed Electric Vehicle decisions

## 📖 Overview

People in Sri Lanka who want to buy an electrical vehicle (EV) find it hard to make the right decision because information is unclear and not made for local needs. They are confused about costs, charging stations and which EV fits their lifestyle. This slows down electrical vehicle adoption in Sri Lanka.

**Volt-Vision** is a comprehensive platform designed to solve this problem by providing:
- 📊 Clear, localized EV information for Sri Lankan consumers
- 🗺️ Interactive charging station maps
- 💰 Transparent cost calculators and comparisons
- 🔍 Personalized EV recommendations based on lifestyle
- 📈 Latest EV news and government policies

## ✨ Features

- **EV Comparison Tool**: Compare different electric vehicles side-by-side
- **Cost Calculator**: Calculate total cost of ownership including electricity, maintenance, and incentives
- **Charging Station Locator**: Find nearby charging stations with real-time availability
- **Lifestyle Matcher**: Get personalized EV recommendations based on your needs
- **Policy Updates**: Stay informed about government incentives and regulations
- **Community Reviews**: Read and share experiences from other EV owners

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- PostgreSQL 12+
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MOHAMMEDAAKIB/Volt-Vision-.git
cd Volt-Vision-
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
```

4. Set up the database:
```bash
cd backend
python manage.py migrate
```

5. Run the development servers:
```bash
# Frontend (in one terminal)
cd frontend
npm run dev

# Backend (in another terminal)
cd backend
python manage.py runserver
```

6. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Volt-Vision/
├── .github/              # GitHub specific files
│   ├── workflows/        # CI/CD workflows
│   └── ISSUE_TEMPLATE/   # Issue templates
├── backend/              # Backend API (Python/Django or FastAPI)
│   ├── api/              # API endpoints
│   ├── models/           # Database models
│   ├── services/         # Business logic
│   └── tests/            # Backend tests
├── frontend/             # Frontend application (React/Next.js)
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── tests/            # Frontend tests
├── docs/                 # Documentation
│   ├── API.md            # API documentation
│   ├── ARCHITECTURE.md   # Architecture overview
│   └── DEPLOYMENT.md     # Deployment guide
├── scripts/              # Utility scripts
├── .editorconfig         # Editor configuration
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore rules
├── CHANGELOG.md          # Version history
├── CODE_OF_CONDUCT.md    # Code of conduct
├── CONTRIBUTING.md       # Contribution guidelines
├── LICENSE               # License file
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: React / Next.js
- **Styling**: Tailwind CSS
- **State Management**: Redux / Context API
- **Maps**: Leaflet / Google Maps API

### Backend
- **Framework**: Django / FastAPI
- **Database**: PostgreSQL
- **Caching**: Redis
- **API**: RESTful / GraphQL

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Hosting**: AWS / Vercel / Heroku

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
pytest

# Run all tests with coverage
npm run test:coverage  # Frontend
pytest --cov           # Backend
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- [API Documentation](./docs/API.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:
- Report bugs
- Suggest features
- Submit pull requests
- Follow our code of conduct

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Mohammed Aakib** - Project Lead - [@MOHAMMEDAAKIB](https://github.com/MOHAMMEDAAKIB)

## 📞 Contact

- **Project Link**: [https://github.com/MOHAMMEDAAKIB/Volt-Vision-](https://github.com/MOHAMMEDAAKIB/Volt-Vision-)
- **Issues**: [https://github.com/MOHAMMEDAAKIB/Volt-Vision-/issues](https://github.com/MOHAMMEDAAKIB/Volt-Vision-/issues)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Sri Lankan EV community for valuable feedback
- Open source libraries and tools that make this possible

---

Made with ❤️ for the Sri Lankan EV community
