from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio
import json
import random
from datetime import datetime, timedelta

app = FastAPI(title="Flight Intelligence API")

# Allow the Next.js frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────
# OPENSKY ADAPTER  (real live flight data)
# ──────────────────────────────────────────
async def fetch_opensky_flights():
    """
    Fetches live flight positions from OpenSky Network (free, no key needed).
    Returns a list of flight objects with position, altitude, speed etc.
    """
    url = "https://opensky-network.org/api/states/all?lamin=10&lomin=60&lamax=60&lomax=120"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.get(url)
            data = resp.json()
            flights = []
            if data and "states" in data and data["states"]:
                for s in data["states"][:80]:
                    if s[5] is None or s[6] is None:
                        continue
                    flights.append({
                        "id":       s[0] or "unknown",
                        "callsign": (s[1] or "N/A").strip(),
                        "country":  s[2] or "Unknown",
                        "lng":      s[5],
                        "lat":      s[6],
                        "altitude": round(s[7] or 0),
                        "speed":    round((s[9] or 0) * 1.94),
                        "heading":  round(s[10] or 0),
                        "source":   "OpenSky (live)"
                    })
            return flights
    except Exception as e:
        print(f"OpenSky fetch failed: {e}")
        return []

# ──────────────────────────────────────────
# MOCK DATA ENGINE
# ──────────────────────────────────────────

AIRPORTS = [
    {"code": "DEL", "name": "Indira Gandhi Intl",  "lat": 28.56,  "lng": 77.10,  "city": "Delhi"},
    {"code": "BOM", "name": "Chhatrapati Shivaji", "lat": 19.09,  "lng": 72.87,  "city": "Mumbai"},
    {"code": "DXB", "name": "Dubai Intl",           "lat": 25.25,  "lng": 55.36,  "city": "Dubai"},
    {"code": "SIN", "name": "Changi Airport",       "lat": 1.36,   "lng": 103.99, "city": "Singapore"},
    {"code": "LHR", "name": "Heathrow",             "lat": 51.47,  "lng": -0.46,  "city": "London"},
    {"code": "JFK", "name": "John F Kennedy",       "lat": 40.64,  "lng": -73.78, "city": "New York"},
    {"code": "CDG", "name": "Charles de Gaulle",    "lat": 49.01,  "lng": 2.55,   "city": "Paris"},
    {"code": "NRT", "name": "Narita Intl",          "lat": 35.77,  "lng": 140.39, "city": "Tokyo"},
    {"code": "SYD", "name": "Kingsford Smith",      "lat": -33.94, "lng": 151.18, "city": "Sydney"},
    {"code": "GRU", "name": "Guarulhos Intl",       "lat": -23.43, "lng": -46.47, "city": "São Paulo"},
]

AIRLINES   = ["AI", "EK", "SQ", "BA", "AF", "UA", "LH", "QF", "TK", "CX"]
ALERT_TYPES = ["Altitude Anomaly", "Speed Deviation", "Route Divergence", "Squawk 7700", "No Signal"]
SEVERITIES  = ["low", "medium", "high"]
COUNTRIES = {
    "DEL": "India",
    "BOM": "India",
    "DXB": "UAE",
    "SIN": "Singapore",
    "LHR": "United Kingdom",
    "JFK": "United States",
    "CDG": "France",
    "NRT": "Japan",
    "SYD": "Australia",
    "GRU": "Brazil",
}

def make_mock_flights(count=60):
    flights = []
    for i in range(count):
        airline = random.choice(AIRLINES)
        num     = random.randint(100, 999)
        origin  = random.choice(AIRPORTS)
        dest    = random.choice(AIRPORTS)
        frac    = random.random()
        lat     = origin["lat"] + frac * (dest["lat"] - origin["lat"]) + random.uniform(-2, 2)
        lng     = origin["lng"] + frac * (dest["lng"] - origin["lng"]) + random.uniform(-2, 2)
        flights.append({
            "id":       f"mock-{i}",
            "callsign": f"{airline}{num}",
            "country": COUNTRIES.get(origin["code"], "Unknown"),
            "lat":      round(lat, 4),
            "lng":      round(lng, 4),
            "altitude": random.randint(8000, 12500),
            "speed":    random.randint(420, 560),
            "heading":  random.randint(0, 359),
            "origin":   origin["code"],
            "dest":     dest["code"],
            "source":   "Synthetic (mock)"
        })
    return flights

def make_mock_alerts(count=6):
    alerts = []
    for i in range(count):
        airline  = random.choice(AIRLINES)
        num      = random.randint(100, 999)
        airport  = random.choice(AIRPORTS)
        severity = random.choice(SEVERITIES)
        atype    = random.choice(ALERT_TYPES)
        alerts.append({
            "id":        f"alert-{i}",
            "callsign":  f"{airline}{num}",
            "type":      atype,
            "severity":  severity,
            "airport":   airport["code"],
            "message":   f"{atype} detected near {airport['city']}",
            "timestamp": (datetime.utcnow() - timedelta(minutes=random.randint(1, 30))).isoformat(),
            "source":    "Synthetic alert engine (mock)"
        })
    return sorted(alerts, key=lambda x: ["high","medium","low"].index(x["severity"]))

def make_route_density():
    routes = []
    for _ in range(12):
        a = random.choice(AIRPORTS)
        b = random.choice(AIRPORTS)
        if a["code"] != b["code"]:
            routes.append({
                "from":    a["code"],  "to":      b["code"],
                "fromLat": a["lat"],   "fromLng": a["lng"],
                "toLat":   b["lat"],   "toLng":   b["lng"],
                "flights": random.randint(5, 40),
                "source":  "Synthetic (mock)"
            })
    return routes

def make_historical_replay():
    snapshots = []
    base_time = datetime.utcnow() - timedelta(hours=2, minutes=30)
    for i in range(30):
        ts = (base_time + timedelta(minutes=i * 5)).isoformat()
        snapshots.append({
            "timestamp": ts,
            "flights":   make_mock_flights(20),
            "alerts":    make_mock_alerts(2),
        })
    return snapshots

# ──────────────────────────────────────────
# REST ENDPOINTS
# ──────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "Flight Intelligence API is running"}

@app.get("/api/flights")
async def get_flights():
    live = await fetch_opensky_flights()
    if live:
        return {"flights": live, "count": len(live), "source": "OpenSky Network (live)"}
    mock = make_mock_flights(60)
    return {"flights": mock, "count": len(mock), "source": "Synthetic (mock — OpenSky unavailable)"}

@app.get("/api/alerts")
def get_alerts():
    return {"alerts": make_mock_alerts(6), "source": "Synthetic alert engine (mock)"}

@app.get("/api/routes")
def get_routes():
    return {"routes": make_route_density(), "source": "Synthetic (mock)"}

@app.get("/api/airports")
def get_airports():
    return {"airports": AIRPORTS}

@app.get("/api/airport/{code}")
def get_airport_detail(code: str):
    airport = next((a for a in AIRPORTS if a["code"] == code.upper()), None)
    if not airport:
        return {"error": "Airport not found"}
    flights_here = [f for f in make_mock_flights(60)
                    if f.get("origin") == code.upper() or f.get("dest") == code.upper()]
    return {
        "airport": airport,
        "flights": flights_here[:10],
        "alerts":  make_mock_alerts(3),
        "traffic": random.randint(120, 480),
        "source":  "Flight Intelligence Analytics Layer"
    }

@app.get("/api/replay")
def get_replay():
    return {"snapshots": make_historical_replay(), "source": "Flight Intelligence Analytics Layer"}

@app.get("/api/download")
def download_sample():
    return {
        "flights":      make_mock_flights(10),
        "alerts":       make_mock_alerts(3),
        "routes":       make_route_density()[:5],
        "generated_at": datetime.utcnow().isoformat(),
        "note":         "Sample data — mix of live (OpenSky) and synthetic sources"
    }

# ──────────────────────────────────────────
# WEBSOCKET  (streams live updates every 5s)
# ──────────────────────────────────────────

@app.websocket("/ws/live")
async def websocket_live(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            live = await fetch_opensky_flights()
            flights = live if live else make_mock_flights(40)
            await ws.send_text(json.dumps({
                "type":    "update",
                "flights": flights[:40],
                "alerts":  make_mock_alerts(3),
                "ts":      datetime.utcnow().isoformat(),
            }))
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        print("Client disconnected")