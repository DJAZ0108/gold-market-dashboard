const BASE = 2408.70;
const instrumentData = [
  { symbol: "XAU/USD", name: "Gold Spot", price: 2408.70, change: 0.90 },
  { symbol: "XAG/USD", name: "Silver Spot", price: 29.81, change: 1.91 },
  { symbol: "DXY", name: "US Dollar Index", price: 104.23, change: -0.22 },
  { symbol: "US10Y", name: "US 10Y Yield", price: 4.39, change: 0.06 },
  { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.0842, change: -0.18 }
];
const timeframes = { "1H": 30, "4H": 48, "1D": 64, "1W": 72, "1M": 84 };
let selectedSide = "buy";
let activeFrame = "1D";
let toastTimer;

const calendar = [
  { time: "13:30", ccy: "USD", event: "Core PCE Price Index", impact: "High", actual: "—", forecast: "—", previous: "—" },
  { time: "14:00", ccy: "USD", event: "Pending Home Sales", impact: "Medium", actual: "—", forecast: "—", previous: "—" },
  { time: "16:00", ccy: "USD", event: "Crude Oil Inventories", impact: "Medium", actual: "—", forecast: "—", previous: "—" },
  { time: "18:00", ccy: "USD", event: "FOMC Member Speech", impact: "High", actual: "—", forecast: "—", previous: "—" }
];
const headlines = [
  { category: "MACRO", time: "Contoh", text: "Pergerakan imbal hasil AS dan ekspektasi suku bunga dapat memengaruhi daya tarik emas." },
  { category: "USD", time: "Contoh", text: "Indeks dolar sering dipantau sebagai salah satu faktor kontekstual untuk XAU/USD." },
  { category: "RISK", time: "Contoh", text: "Permintaan aset safe-haven dapat berubah saat sentimen risiko dan ketidakpastian meningkat." }
];
const drivers = [
  { name: "US Dollar Index", detail: "Contoh perubahan harian", value: "−0.22%", tone: "up" },
  { name: "US 10Y yield", detail: "Contoh yield indikatif", value: "4.39%", tone: "down" },
  { name: "Real yields", detail: "Perlu data terverifikasi", value: "N/A", tone: "" },
  { name: "Risk sentiment", detail: "Ringkasan editorial demo", value: "Mixed", tone: "" }
];

function money(value) { return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); }
function signed(value) { return `${value >= 0 ? "+" : "−"}${Math.abs(value).toFixed(2)}%`; }

function renderWatchlist() {
  document.getElementById("watchlist").innerHTML = instrumentData.map((item, index) => `
    <div class="watch-item ${index === 0 ? "active" : ""}">
      <span class="watch-symbol">${item.symbol}</span><span class="watch-price">${item.price < 10 ? item.price.toFixed(4) : money(item.price)}</span>
      <span class="watch-name">${item.name}</span><span class="watch-change ${item.change >= 0 ? "up" : "down"}">${signed(item.change)}</span>
    </div>`).join("");
}
function renderHeader() {
  document.getElementById("goldPrice").textContent = money(BASE);
  document.getElementById("goldChange").textContent = `${signed(0.90)} · DEMO`;
  document.getElementById("goldOpen").textContent = money(2387.30);
  document.getElementById("goldHigh").textContent = money(2414.80);
  document.getElementById("goldLow").textContent = money(2382.10);
  document.getElementById("prevClose").textContent = money(2387.30);
}
function renderChart(frame = activeFrame) {
  activeFrame = frame;
  const svg = document.getElementById("priceChart");
  const count = timeframes[frame];
  let value = BASE - 25;
  const series = Array.from({ length: count }, (_, i) => {
    value += Math.sin(i * 0.43) * 1.65 + Math.cos(i * 0.19) * 1.1 + (i > count * .65 ? .32 : .08);
    return value;
  });
  series[series.length - 1] = BASE;
  const width = 900, height = 330, left = 8, right = 54, top = 14, bottom = 22;
  const low = Math.min(...series) - 5, high = Math.max(...series) + 5;
  const x = i => left + i / (series.length - 1) * (width - left - right);
  const y = v => top + (high - v) / (high - low) * (height - top - bottom);
  const pts = series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `M${x(0)},${height-bottom} L${pts.replaceAll(" ", " L")} L${x(series.length - 1)},${height-bottom} Z`;
  const grid = Array.from({ length: 5 }, (_, i) => {
    const yy = top + i * (height - top - bottom) / 4;
    const label = high - i * (high - low) / 4;
    return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" stroke="#202b34" stroke-dasharray="3 5"/><text x="${width-right+7}" y="${yy+3}" fill="#748391" font-size="9" font-family="DM Mono">${label.toFixed(0)}</text>`;
  }).join("");
  const candleCount = Math.min(24, series.length - 1);
  const candles = Array.from({ length: candleCount }, (_, j) => {
    const i = Math.floor(j * (series.length - 1) / candleCount) + 1;
    const prev = series[i - 1], close = series[i];
    const up = close >= prev, xx = x(i), topY = Math.min(y(prev), y(close)), bodyH = Math.max(2, Math.abs(y(prev) - y(close));
    return `<line x1="${xx}" y1="${topY-4}" x2="${xx}" y2="${topY+bodyH+4}" stroke="${up ? "#42c99a" : "#f07878"}" opacity=".55"/><rect x="${xx-2.2}" y="${topY}" width="4.4" height="${bodyH}" fill="${up ? "#42c99a" : "#f07878"}" opacity=".75"/>`;
  }).join("");
  svg.innerHTML = `<defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#d9ad54" stop-opacity=".2"/><stop offset="1" stop-color="#d9ad54" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#areaFill)"/><g>${candles}</g><polyline points="${pts}" fill="none" stroke="#e4b85e" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><line x1="${x(0)}" y1="${y(BASE)}" x2="${width-right}" y2="${y(BASE)}" stroke="#d6b568" stroke-dasharray="4 4" opacity=".65"/><rect x="${width-right+3}" y="${y(BASE)-9}" width="47" height="18" rx="3" fill="#d5ae5d"/><text x="${width-right+7}" y="${y(BASE)+3}" fill="#15130e" font-size="9" font-family="DM Mono">${BASE.toFixed(2)}</text>`;
  document.getElementById("chartIntervalLabel").textContent = `· ${frame}`;
  document.getElementById("chartOhlc").textContent = `O ${money(series[0])}   H ${money(high - 5)}   L ${money(low + 5)}   C ${money(BASE)}`;
}
function renderIndicators() {
  const data = [
    ["RSI (14)", "57.8", "NEUTRAL"], ["MACD", "+1.24", "POSITIVE"], ["SMA (20)", "2,397.40", "PRICE ABOVE"], ["ATR (14)", "12.60", "MODERATE"]
  ];
  document.getElementById("indicators").innerHTML = data.map(([label, value, note]) => `<div class="indicator"><span>${label}</span><b>${value}</b><em>${note}</em></div>`).join("");
}
function renderCalendar() {
  document.getElementById("calendarRows").innerHTML = calendar.map(e => `<tr><td class="event-time">${e.time}</td><td>${e.ccy}</td><td>${e.event}</td><td><span class="impact ${e.impact.toLowerCase()}">${e.impact}</span></td><td>${e.actual}</td><td>${e.forecast}</td><td>${e.previous}</td></tr>`).join("");
}
function renderDrivers() {
  document.getElementById("drivers").innerHTML = drivers.map(d => `<div class="driver"><div class="driver-label"><b>${d.name}</b><small>${d.detail}</small></div><span class="driver-value ${d.tone}">${d.value}</span></div>`).join("");
}
function renderNews() {
  document.getElementById("newsRows").innerHTML = headlines.map(item => `<article class="news-item"><div class="news-meta"><i class="news-dot"></i>${item.category}<span>·</span>${item.time}</div><p>${item.text}</p></article>`).join("");
}
function updateRisk() {
  const entry = Number(document.getElementById("entryPrice").value) || 0;
  const lots = Number(document.getElementById("lotSize").value) || 0;
  const sl = Number(document.getElementById("stopLoss").value) || 0;
  const tp = Number(document.getElementById("takeProfit").value) || 0;
  const risk = Math.abs(entry - sl) * lots * 100;
  const reward = Math.abs(tp - entry) * lots * 100;
  document.getElementById("riskValue").textContent = `$${money(risk)}`;
  document.getElementById("rewardValue").textContent = `$${money(reward)}`;
  document.getElementById("rrValue").textContent = risk ? `1 : ${(reward / risk).toFixed(2)}` : "—";
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}
function updateClock() {
  const time = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());
  document.getElementById("clock").textContent = `${time} WIB`;
}

document.getElementById("timeframes").addEventListener("click", event => {
  const button = event.target.closest("button[data-frame]");
  if (!button) return;
  document.querySelectorAll("#timeframes button").forEach(item => item.classList.toggle("selected", item === button));
  renderChart(button.dataset.frame);
});
document.getElementById("resetChart").addEventListener("click", () => renderChart(activeFrame));
document.getElementById("sideToggle").addEventListener("click", event => {
  const button = event.target.closest("button[data-side]");
  if (!button) return;
  selectedSide = button.dataset.side;
  document.querySelectorAll("#sideToggle button").forEach(item => item.classList.toggle("selected", item === button));
  updateRisk();
});
["entryPrice", "lotSize", "stopLoss", "takeProfit"].forEach(id => document.getElementById(id).addEventListener("input", updateRisk));
document.getElementById("paperOrder").addEventListener("click", () => showToast(`Order ${selectedSide.toUpperCase()} hanya simulasi — tidak dikirim ke broker.`));
document.getElementById("addWatch").addEventListener("click", () => showToast("Watchlist demo: instrumen contoh sudah ditampilkan."));
document.getElementById("resetChart").setAttribute("aria-label", "Gambar ulang grafik demo");

renderWatchlist(); renderHeader(); renderChart(); renderIndicators(); renderCalendar(); renderDrivers(); renderNews(); updateRisk(); updateClock();
setInterval(updateClock, 1000);
