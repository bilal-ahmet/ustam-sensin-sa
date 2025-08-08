# Ustam Sensin - Demo

Kocaeli/İzmit bölgesindeki sanayi ustaları ile müşterileri buluşturan web uygulaması.

## 🚀 Özellikler

- **Usta Arama**: Araç markası, modeli ve arıza kategorisine göre usta bulma
- **Usta Detayları**: Puan, önceki işler, uzmanlık alanları
- **İş Emri Takibi**: Adım adım onarım süreci takibi
- **Favori Ustalar**: Beğenilen ustaları kaydetme
- **Modern UI**: Responsive tasarım, dark mode desteği

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Templating**: EJS (Client-side)
- **UI Framework**: Bootstrap 5
- **Routing**: Hash-based client-side routing
- **Storage**: localStorage

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development modu
npm run dev

# Production modu
npm start
```

## 🌐 Vercel Deployment

Bu proje Vercel'de yayınlanmaya hazır. Vercel ayarları:

### Build Settings
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.` (root directory)
- **Install Command**: `npm install`

### Vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 📁 Proje Yapısı

```
ustam-sensin/
├── index.html              # Ana HTML dosyası
├── public/
│   ├── css/
│   │   └── main.css       # Ana stil dosyası
│   ├── js/
│   │   ├── app.js         # Ana uygulama
│   │   ├── router.js      # Client-side routing
│   │   ├── controllers/   # Sayfa controller'ları
│   │   ├── models/        # Data modelleri
│   │   ├── services/      # Servisler
│   │   └── utils/         # Yardımcı fonksiyonlar
│   └── templates/         # EJS template'leri
├── package.json
├── vercel.json           # Vercel yapılandırması
└── README.md
```

## 🎯 Kullanım

1. **Ana Sayfa**: Usta arama formu ve öne çıkan ustalar
2. **Usta Listesi**: Filtreleme ve sıralama seçenekleri
3. **Usta Detayı**: Detaylı bilgiler ve "Bu Ustayı Seç" butonu
4. **İş Emri Oluşturma**: Yeni iş emri formu
5. **İş Emri Takibi**: Adım adım süreç takibi

## 🔧 Development

```bash
# Nodemon ile hot reload
npm run dev

# Normal başlatma
npm start
```

## 📱 Responsive Design

- Mobile-first yaklaşım
- Bootstrap 5 grid sistemi
- Touch-friendly arayüz
- Progressive Web App (PWA) hazır

## 🌙 Dark Mode

- Sistem tercihine göre otomatik tema
- Manuel tema değiştirme
- localStorage ile tema kaydetme


