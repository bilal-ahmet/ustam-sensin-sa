# Ustam Sensin - Demo

Kocaeli/İzmit bölgesindeki sanayi ustaları ile müşterileri buluşturan web uygulaması.

## 🚀 Özellikler

- **Usta Arama**: Marka, model ve arıza kategorisine göre usta bulma
- **Usta Detayları**: Puan, önceki işler, uzmanlık alanları
- **İş Emri Takibi**: Adım adım onarım süreci takibi
- **Favori Ustalar**: Beğenilen ustaları kaydetme
- **Modern Tasarım**: Responsive ve kullanıcı dostu arayüz

## 🛠️ Teknolojiler

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Templating**: EJS (Client-side)
- **UI Framework**: Bootstrap 5
- **Routing**: Hash-based client-side routing
- **State Management**: localStorage
- **Server**: Node.js HTTP Server

## 📦 Kurulum

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production sunucusunu başlat
npm start
```

Uygulama `http://localhost:3001` adresinde çalışacaktır.

## 🌐 Vercel Deployment

### Otomatik Deployment

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub/GitLab/Bitbucket hesabınızı bağlayın
3. Bu repository'yi import edin
4. Vercel otomatik olarak deploy edecektir

### Manuel Deployment

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production'a deploy
vercel --prod
```

## 📁 Proje Yapısı

```
ustam-sensin/
├── index.html              # Ana HTML dosyası
├── server.js               # Node.js HTTP sunucusu
├── vercel.json            # Vercel yapılandırması
├── package.json           # NPM yapılandırması
├── README.md              # Bu dosya
└── public/
    ├── css/
    │   └── main.css       # Ana stil dosyası
    ├── js/
    │   ├── app.js         # Ana uygulama dosyası
    │   ├── router.js      # Client-side routing
    │   ├── controllers/   # Sayfa controller'ları
    │   ├── models/        # Veri modelleri
    │   ├── services/      # Servis katmanı
    │   └── utils/         # Yardımcı fonksiyonlar
    └── templates/         # EJS template'leri
        ├── mechanicCard.ejs
        └── stepper.ejs
```

## 🎯 Kullanım

1. **Ana Sayfa**: Usta arama formu ve öne çıkan ustalar
2. **Usta Listesi**: Filtreleme ve sıralama seçenekleri
3. **Usta Detayı**: Detaylı bilgiler ve iş emri oluşturma
4. **İş Emri**: Yeni iş emri oluşturma ve takip
5. **İş Emirleri**: Tüm iş emirlerini görüntüleme

## 🔧 Geliştirme

### Yeni Özellik Ekleme

1. Controller dosyası oluşturun (`public/js/controllers/`)
2. Router'a route ekleyin (`public/js/router.js`)
3. Model dosyası oluşturun (gerekirse)
4. Template dosyası oluşturun (gerekirse)

### Stil Değişiklikleri

- Ana stil dosyası: `public/css/main.css`
- Bootstrap 5 kullanılıyor
- CSS değişkenleri ile tema desteği

## 📝 Notlar

- Bu bir demo uygulamasıdır
- Backend yok, tüm veriler client-side'da tutulur
- localStorage kullanılarak veri kalıcılığı sağlanır
- Gerçek veriler yerine mock data kullanılır

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.


