# Gold Market Dashboard

A clean, gold-focused market dashboard inspired by the structure of the Forex Factory economic calendar and market summary layout.

## What is included
- Gold spot price overview with daily change
- USD Index, 10Y Treasury, silver, and SP 500 summary cards
- Market driver cards for macro sentiment and yield pressure
- Gold trend chart rendered in SVG
- Economic calendar table with impact, forecast, and previous values
- News summary panel focused on precious metals and macro headlines
- Responsive layout for desktop and mobile

## Run locally
Open `index.html` directly in a browser, or serve it with a local web server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Data source note
This version uses a curated dashboard dataset styled around the information commonly seen on Forex Factory, especially the economic calendar and market summary blocks. It is designed to be a fast front-end demo and can later be connected to a real market API or a refresh pipeline if needed.

## Files
- `index.html` — dashboard structure
- `styles.css` — visual styling and layout
- `script.js` — sample data and dynamic rendering

## Next upgrades
- Connect to a real gold price API
- Add automatic refresh and time-based market data updates
- Integrate a real Forex Factory calendar feed or proxy service
- Add more technical indicators and alerts
