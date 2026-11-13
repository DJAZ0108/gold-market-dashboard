const goldSeries = [
  2338, 2340, 2337, 2347, 2351, 2348, 2354, 2358, 2355,
  2362, 2359, 2368, 2375, 2371, 2378, 2384, 2389, 2385,
  2394, 2399, 2402, 2407, 2404, 2410, 2408.7
];

const positions = [
  { symbol: "XAU/USD", side: "Buy", lots: "2.00", entry: "2398.60", mark: "2408.70", pnl: "+$210.20", cls: "side-bull" },
  { symbol: "XAG/USD", side: "Buy", lots: "4.00", entry: "29.48", mark: "29.81", pnl: "+$1.32", cls: "side-bull" },
  { symbol: "EUR/USD", side: "Sell", lots: "1.50", entry: "1.0630", mark: "1.0599", pnl: "+$46.50", cls: "side-bull" },
  { symbol: "USD/JPY", side: "Buy", lots: "1.20", entry: "148.80", mark: "149.52", pnl: "-$38.40", cls: "side-bear" }
];

const calendar = [
  { time: "13:30", currency: "USD", event: "Core PCE Price Index", impact: "High", actual: "2.6%" },
  { time: "13:30", currency: "USD", event: "GDP Annualized", impact: "High", actual: "2.8%" },
  { time: "09:30", currency: "GBP", event: "Claimant Count Change", impact: "Medium", actual: "7.2K" },
  { time: "09:30", currency: "USD", event: "Initial Claims", impact: "Medium", actual: "216K" },
  { time: "18:00", currency: "EUR", event: "ECB Press Conference", impact: "High", actual: "-" }
];

const news = [
  { tag: "High", title: "Treasury yields soften as traders price a softer next move from the Fed", meta: "Gold remains bid above recent support with risk sentiment still stable.", time: "08:45 GMT" },
  { tag: "Medium", title: "Dollar index eases, lifting non-US assets and supporting precious metals", meta: "A modest pullback in DXY helps gold retain upside momentum.", time: "06:20 GMT" },
  { tag: "High", title: "Geopolitical headlines keep safe-haven demand elevated in metals", meta: "Volatility remains elevated, reinforcing gold's hedge characteristics.", time: "04:55 GMT" },
  { tag: "Medium", title: "China manufacturing data draws attention from industrial metals complex", meta: "Broad commodity sentiment remains constructive but mixed.", time: "02:10 GMT" }
];

function renderChart() {
  const svg = document.getElementById("goldChart");
  const width = 960;
  const height = 300;
  const padding = 28;
  const min = Math.min(...goldSeries) - 12;
  const max = Math.max(...goldSeries) + 12;

  const points = goldSeries.map((value, index) => {
    const x = padding + (index / (goldSeries.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / (max - min || 1)) * (height - padding * 2);
    return { x, y };
  });

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`)
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x.toFixed(2)},${height - padding} L ${points[0].x.toFixed(2)},${height - padding} Z`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="goldFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(240,197,109,0.45)" />
        <stop offset="100%" stop-color="rgba(240,197,109,0.02)" />
      </linearGradient>
    </defs>
    <g>
      <path d="${area}" fill="url(#goldFill)" opacity="0.9"></path>
      <path d="${line}" fill="none" stroke="#f0c56d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
      <circle cx="${points[points.length - 1].x}" cy="${points[points.length - 1].y}" r="5" fill="#f0c56d"></circle>
    </g>
  `;
}

function renderPositions() {
  const table = document.getElementById("positionsTable");
  table.innerHTML = positions.map((item) => `
    <tr>
      <td>${item.symbol}</td>
      <td class="${item.cls}">${item.side}</td>
      <td>${item.lots}</td>
      <td>${item.entry}</td>
      <td>${item.mark}</td>
      <td class="${item.cls}">${item.pnl}</td>
    </tr>
  `).join("");
}

function renderCalendar() {
  const table = document.getElementById("calendarTable");
  table.innerHTML = calendar.map((item) => {
    const impactClass = item.impact === "High" ? "negative" : item.impact === "Medium" ? "positive" : "neutral";
    return `
      <tr>
        <td>${item.time}</td>
        <td>${item.currency}</td>
        <td>${item.event}</td>
        <td class="${impactClass}">${item.impact}</td>
        <td>${item.actual}</td>
      </tr>
    `;
  }).join("");
}

function renderNews() {
  const list = document.getElementById("newsList");
  list.innerHTML = news.map((item) => `
    <div class="news-item">
      <span class="news-badge ${item.tag.toLowerCase()}">${item.tag}</span>
      <div class="news-copy">
        <strong>${item.title}</strong>
        <span>${item.meta}</span>
      </div>
      <div class="news-time">${item.time}</div>
    </div>
  `).join("");
}

function updateHeader() {
  const gold = 2408.7;
  const pct = 0.9;
  document.getElementById("goldPrice").textContent = `$${gold.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  document.getElementById("goldChange").textContent = `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
  document.getElementById("goldChange").className = `change-pill ${pct >= 0 ? "positive" : "negative"}`;
}

updateHeader();
renderChart();
renderPositions();
renderCalendar();
renderNews();
