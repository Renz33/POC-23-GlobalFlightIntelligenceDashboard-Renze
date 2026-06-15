# Global Flight Intelligence Dashboard

## Overview

Global Flight Intelligence Dashboard is a production-style aviation intelligence platform designed to demonstrate how real-time flight data, route analytics, anomaly detection, and airport intelligence can be presented through a modern dashboard experience.

The project combines live flight information from OpenSky Network with a synthetic intelligence engine that automatically generates realistic flight, route, and alert data whenever live sources are unavailable. This ensures uninterrupted dashboard operation and allows the platform to function as both a monitoring tool and a demonstration environment.

---

## Key Features

### Live Flight Tracking

* Real-time aircraft positions displayed on an interactive map.
* Aircraft heading, altitude, speed, and country information.
* Automatic updates from OpenSky Network.

### Synthetic Fallback Engine

* Generates realistic flight, route, and alert data.
* Activates automatically when live data is unavailable.
* Clearly labeled to distinguish from live information.

### Route Density Analytics

* Displays high-traffic flight corridors.
* Highlights major international aviation routes.
* Supports operational traffic analysis.

### Active Alert System

* Route divergence detection.
* Speed deviation monitoring.
* No-signal alerts.
* Emergency squawk simulation.
* Severity-based alert classification.

### Historical Replay

* Replay historical flight snapshots.
* Review previous flight movements and alerts.
* Demonstrates timeline-based intelligence analysis.

### Airport Intelligence Drill-Down

* Airport-specific traffic overview.
* Daily movement statistics.
* Flight activity summaries.
* Operational status indicators.

### Advanced Filtering

* Country-based filtering.
* Minimum speed filtering.
* Minimum altitude filtering.
* Instant dashboard-wide updates.

### Downloadable Sample Data

* Export filtered flight intelligence data as JSON.
* Useful for testing and analytics workflows.

---

## Why This Matters

Modern aviation generates massive volumes of real-time data. Converting this information into actionable intelligence requires effective visualization, monitoring, and analysis tools.

This dashboard demonstrates how flight intelligence systems can support:

* Operational monitoring
* Traffic analysis
* Aviation safety awareness
* Route optimization studies
* Intelligence and research workflows

---

## Who Controls the Rail?

The core rail represented in this project is **Data & Intelligence**.

Organizations contributing to this ecosystem include:

* OpenSky Network
* ADS-B Data Providers
* Aviation Intelligence Platforms
* Air Traffic Monitoring Systems
* Analytics and Decision Support Tools

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Leaflet Maps
* Tailwind CSS

### Backend

* Python
* FastAPI
* Uvicorn

### Data Sources

* OpenSky Network (Live Flight Data)
* Synthetic Intelligence Engine (Fallback Data)

---

## System Architecture

User Interface (Next.js)
↓
REST API Requests
↓
FastAPI Backend
↓
OpenSky Network (Live Data)
↓
Synthetic Intelligence Engine (Fallback)

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## API Endpoints

### Flights

```http
GET /api/flights
```

Returns live or synthetic flight information.

### Alerts

```http
GET /api/alerts
```

Returns active aviation alerts.

### Routes

```http
GET /api/routes
```

Returns route density analytics.

### Airports

```http
GET /api/airports
```

Returns airport metadata.

### Airport Details

```http
GET /api/airport/{code}
```

Returns airport intelligence information.

### Historical Replay

```http
GET /api/replay
```

Returns replay snapshots.

---

## Future Improvements

* ADS-B Exchange adapter integration
* Real anomaly detection engine
* User authentication
* Flight search by callsign
* Real-time WebSocket updates
* Deployment to cloud infrastructure
* Advanced analytics dashboards

---

## Disclaimer

This project combines real aviation data and synthetic demonstration data. Synthetic information is clearly labeled and is intended solely for educational and demonstration purposes.
