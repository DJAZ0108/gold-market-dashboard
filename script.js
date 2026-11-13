const goldSeries = [2339.6, 2343.2, 2337.1, 2347.2, 2351.8, 2344.9, 2358.5, 2362.1, 2355.4, 2368.3, 2371.5, 2366.7, 2380.9, 2386.4, 2391.2, 2387.6, 2398.4, 2402.1, 2397.8, 2408.7];

const marketSnapshot = {
  gold: {
    price: 2408.7,
    change: 21.4,
    changePct: 0.9,
    open: 2387.3,
    high: 2414.8,
    low: 2382.1,
    range: 32.7,
    trend: "Bullish",
    volatility: "Moderate"
  },
  dxy: { value: 108.64, change: 0.24, changePct: 0.22 },
  yield: { value: 4.39, change: 0.06, changePct: 1.39 },
  silver: { value: 29.81, change: 0.56, changePct: 1.91 },
  sp500: { value: 5817.36, change: 16.2, changePct: 0.28 }
};

const marketDrivers = [
  { label: "US Dollar Index", detail: "DXY firming", value: "+0.22%", tone: "positive" },
  { label: "Treasury yields", detail: "Rate expectations steady", value: "4.39%", tone: "negative" },
  { label: "Real yields", detail: "Support remains constructive", value: "+2.10%", tone: "positive" },
  { label: "Geopolitical risk", detail: "Safe-haven demand", value: "Elevated", tone: "positive" },
  { label: "Fed path", detail: "Awaiting policy guidance", value: "Neutral", tone: "neutral" }
];

const watchlist = [
  { symbol: "XAU/USD", last: "2408.70", daily: "+0.90%", bias: "Bullish" },
  { symbol: "XAG/USD", last: "29.81", daily: "+1.91%", bias: "Bullish" },
  { symbol: "USD/JPY", last: "149.52", daily: "+0.12%", bias: "Neutral" },
  { symbol: "EUR/USD", last: "1.0603", daily: "-0.18%", bias: "Bearish" },
  { symbol: "US10Y", last: "4.39%", daily: "+0.06%", bias: "Bearish" }
];

const newsList = [
  {
    tag: "High",
    title: "Fed speakers reinforce cautious tone while bullion holds firm above key support",
    meta: "Policy guidance and real yields remain key for gold direction",
    time: "08:40 GMT"
  },
  {
    tag: "Medium",
    title: "US Treasury yields drift higher, but weaker dollar support cushions gold demand",
    meta: "A softening dollar offsets some pressure from higher yields",
    time: "06:25 GMT"
  },
  {
    tag: "High",
    title: "Geopolitical risk keeps safe-haven flows alive as traders monitor regional headlines",
    meta: "Gold benefits from uncertainty and positioning into key macro releases",
    time: "04:10 GMT"
  },
  {
    tag: "Medium",
    title: "China data focus and commodity demand remain in play across metals markets",
    meta: "Industrial demand and macro signals can influence broader precious metals sentiment",
    time: "02:55 GMT"
  }
];

const sentiment = [
  { label: "Gold appetite", value: 78 },
  { label: "Dollar strength", value: 58 },
  { label: "Yield pressure", value: 66 },
  { label: "Risk sentiment", value: 54 }
];

const calendar = [
  { time: "18:00", currency: "USD", event: "FOMC Member Speech", impact: "High", actual: "-", forecast: "-", previous: "-" },
  { time: "13:30", currency: "USD", event: "Core PCE Price Index", impact: "High", actual: "2.6%", forecast: "2.6%", previous: "2.5%" },
  { time: "13:30", currency: "USD", event: "GDP Annualized", impact: "High", actual: "2.8%", forecast: "2.5%", previous: "2.1%" },
  { time: "12:00", currency: "EUR", event: "ECB Press Conference", impact: "High", actual: "-", forecast: "-", previous: "-" },
  { time: "09:30", currency: "GBP", event: "Claimant Count Change", impact: "Medium", actual: "-", forecast: "7.2K", previous: "8.4K" },
  { time: "09:30", currency: "USD", event: "Initial Jobless Claims", impact: "Medium", actual: "216K", forecast: "220K", previous: "218K" }
];

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function renderHeader() {
  const gold = marketSnapshot.gold;
  const changeClass = gold.changePct >= 0 ? "positive" : "negative";

  document.getElementById("goldPrice").textContent = formatMoney(gold.price);
  document.getElementById("goldChange").textContent = `${gold.changePct >= 0 ? "+" : ""}${gold.changePct.toFixed(2)}%`;
  document.getElementById("goldChange").className = `change-pill ${changeClass}`;
  document.getElementById("goldOpen").textContent = formatMoney(gold.open);
  document.getElementById("goldHigh").textContent = formatMoney(gold.high);
  document.getElementById("goldLow").textContent = formatMoney(gold.low);
  document.getElementById("goldRange").textContent = formatMoney(gold.range);
  document.getElementById("trendLabel").textContent = gold.trend;
  document.getElementById("volatilityValue").textContent = gold.volatility;

  document.getElementById("dxyValue").textContent = marketSnapshot.dxy.value.toFixed(2);
  document.getElementById("dxyChange").textContent = `${marketSnapshot.dxy.changePct >= 0 ? "+" : ""}${marketSnapshot.dxy.changePct.toFixed(2)}%`;
  document.getElementById("dxyChange").className = `stat-foot ${marketSnapshot.dxy.changePct >= 0 ? "positive" : "negative"}`;

  document.getElementById("yieldValue").textContent = `${marketSnapshot.yield.value.toFixed(2)}%`;
  document.getElementById("yieldChange").textContent = `${marketSnapshot.yield.changePct >= 0 ? "+" : ""}${marketSnapshot.yield.changePct.toFixed(2)}%`;
  document.getElementById("yieldChange").className = `stat-foot ${marketSnapshot.yield.changePct >= 0 ? "positive" : "negative"}`;

  document.getElementById("silverValue").textContent = formatMoney(marketSnapshot.silver.value);
  document.getElementById("silverChange").textContent = `${marketSnapshot.silver.changePct >= 0 ? "+" : ""}${marketSnapshot.silver.changePct.toFixed(2)}%`;
  document.getElementById("silverChange").className = `stat-foot ${marketSnapshot.silver.changePct >= 0 ? "positive" : "negative"}`;

  document.getElementById("sp500Value").textContent = marketSnapshot.sp500.value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  document.getElementById("sp500Change").textContent = `${marketSnapshot.sp500.changePct >= 0 ? "+" : ""}${marketSnapshot.sp500.changePct.toFixed(2)}%`;
  document.getElementById("sp500Change").className = `stat-foot ${marketSnapshot.sp500.changePct >= 0 ? "positive" : "negative"}`;
}

function renderChart() {
  const svg = document.getElementById("goldChart");
  const width = 740;
  const height = 250;
  const min = Math.min(...goldSeries) - 8;
  const max = Math.max(...goldSeries) + 8;

  const points = goldSeries
    .map((value, index) => {
      const x = (index / (goldSeries.length - 1)) * width;
      const y = height - ((value - min) / (max - min || 1)) * (height - 18) - 10;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="goldArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="rgba(243,199,108,0.45)" />
        <stop offset="100%" stop-color="rgba(243,199,108,0.02)" />
      </linearGradient>
    </defs>
    <g>
      <path d="M ${areaPoints}" fill="url(#goldArea)"></path>
      <polyline
        points="${points}"
        fill="none"
        stroke="#f3c76c"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></polyline>
    </g>
  `;
}

function renderDrivers() {
  const node = document.getElementById("driverList");
  node.innerHTML = marketDrivers
    .map((item) => {
      const toneClass = item.tone === "positive" ? "positive" : item.tone === "negative" ? "negative" : "neutral";
      return `
        <div class="driver-item">
          <div class="driver-label">
            <strong>${item.label}</strong>
            <span>${item.detail}</span>
          </div>
          <div class="driver-value ${toneClass}">${item.value}</div>
        </div>
      `;
    })
    .join("");
}

function renderWatchlist() {
  const node = document.getElementById("watchlistTable");
  node.innerHTML = watchlist
    .map((item) => {
      const changeClass = item.daily.includes("-") ? "negative" : "positive";
      return `
        <tr>
          <td>${item.symbol}</td>
          <td>${item.last}</td>
          <td class="${changeClass}">${item.daily}</td>
          <td>${item.bias}</td>
        </tr>
      `;
    })
    .join("");
}

function renderSentiment() {
  const node = document.getElementById("sentimentList");
  node.innerHTML = sentiment
    .map((item) => `
      <div class="sentiment-item">
        <strong>${item.label}</strong>
        <div class="sentiment-bar">
          <div class="sentiment-fill" style="width: ${item.value}%"></div>
        </div>
      </div>
    `)
    .join("");
}

function renderCalendar() {
  const node = document.getElementById("calendarTable");
  node.innerHTML = calendar
    .map((item) => `
      <tr>
        <td>${item.time}</td>
        <td>${item.currency}</td>
        <td>${item.event}</td>
        <td><span class="${item.impact === "High" ? "negative" : item.impact === "Medium" ? "neutral" : "positive"}">${item.impact}</span></td>
        <td>${item.actual}</td>
        <td>${item.forecast}</td>
        <td>${item.previous}</td>
      </tr>
    `)
    .join("");
}

function renderNews() {
  const node = document.getElementById("newsList");
  node.innerHTML = newsList
    .map((item) => `
      <article class="news-item">
        <span class="news-tag ${item.tag.toLowerCase()}">${item.tag}</span>
        <div class="news-copy">
          <strong>${item.title}</strong>
          <span>${item.meta}</span>
        </div>
        <div class="news-time">${item.time}</div>
      </article>
    `)
    .join("");
}

function updateTimestamp() {
  const updated = new Date();
  document.getElementById("lastUpdated").textContent = `Updated ${updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

renderHeader();
renderChart();
renderDrivers();
renderWatchlist();
renderSentiment();
renderCalendar();
renderNews();
updateTimestamp();

setInterval(updateTimestamp, 60000);
