# User Acceptance Testing (UAT)

## Project
Global Flight Intelligence Dashboard

## Purpose

The purpose of this User Acceptance Testing document is to verify that the Global Flight Intelligence Dashboard performs its intended functions and provides a usable experience for end users.

---

## Test Environment

Frontend:
- Next.js
- TypeScript

Backend:
- FastAPI
- Python

Browser:
- Google Chrome

---

## Test Cases

### UAT-01: Dashboard Loads Successfully

Objective:
Verify that the dashboard loads without errors.

Expected Result:
Dashboard interface appears with statistics, map, routes and alerts.

Outcome:
Successful.

---

### UAT-02: Live Flight Data Retrieval

Objective:
Verify that flight information is retrieved from the backend.

Expected Result:
Flights are displayed on the map.

Outcome:
Successful.

---

### UAT-03: Synthetic Data Fallback

Objective:
Verify fallback behaviour when live flight data is unavailable.

Expected Result:
Synthetic flight data is generated and displayed.

Outcome:
Successful.

---

### UAT-04: Country Filter

Objective:
Verify filtering by country.

Expected Result:
Only flights matching the selected country remain visible.

Outcome:
Successful.

---

### UAT-05: Speed Filter

Objective:
Verify minimum speed filtering.

Expected Result:
Only flights above the specified speed are displayed.

Outcome:
Successful.

---

### UAT-06: Altitude Filter

Objective:
Verify minimum altitude filtering.

Expected Result:
Only flights above the specified altitude are displayed.

Outcome:
Successful.

---

### UAT-07: Airport Drill Down

Objective:
Verify airport information popup.

Expected Result:
Airport details and related flight information are displayed.

Outcome:
Successful.

---

### UAT-08: Historical Replay

Objective:
Verify replay functionality.

Expected Result:
Historical snapshots update as replay progresses.

Outcome:
Successful.

---

### UAT-09: Download Data

Objective:
Verify JSON export.

Expected Result:
A downloadable JSON file is generated.

Outcome:
Successful.

---

## Conclusion

All major dashboard features operated as expected during testing. The application successfully displayed flight information, alerts, route intelligence and airport details while supporting filtering and historical replay capabilities.