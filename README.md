# Aurum Terminal — XAU/USD

Prototype dashboard web bergaya trading terminal untuk ringkasan pasar emas.

## Menjalankan
Buka `index.html` di browser, atau jalankan server lokal di folder proyek:

```bash
python3 -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Fitur prototipe
- Terminal responsif dengan watchlist, quote XAU/USD, dan grafik ilustratif.
- Pilihan timeframe 1H, 4H, 1D, 1W, dan 1M (mengubah visualisasi data demo).
- Indikator teknikal contoh, konteks driver pasar, kalender ekonomi, dan panel berita.
- Paper-trading ticket yang menghitung estimasi risiko/imbalan dan rasio risk/reward.
- Tombol order hanya menampilkan konfirmasi simulasi; tidak ada transaksi yang dikirim ke broker.
- Tautan langsung ke kalender Forex Factory.

## Penting: data bukan live
Angka harga, indikator, kalender, watchlist, dan headline di versi ini **data demo/statis**, bukan data pasar aktual dan tidak diambil otomatis dari Forex Factory. Grafik timeframe juga merupakan ilustrasi simulasi. Label ini ditampilkan di UI agar data contoh tidak disalahartikan sebagai quote atau berita terkini.

Untuk mengaktifkan data live, dibutuhkan penyedia harga/berita yang mengizinkan penggunaan tersebut. Kalender Forex Factory dibuka melalui tautan resmi; dashboard ini tidak melakukan scraping atau mengklaim integrasi feed Forex Factory. Jangan gunakan kalkulator demo sebagai rekomendasi atau instruksi trading.
