Ustam Sensin (Demo)

Modern, sadece frontend ile (JavaScript, Bootstrap) çalışan, İzmit sanayide ustalar ile müşterileri eşleştiren demo.

Çalıştırma
- Node gerekmez; herhangi bir statik sunucu yeterli.
- Hızlı başlatmak için:

```bash
npx serve -s . -l 5173
```

Ardından tarayıcıda `http://localhost:5173` adresine gidin.

Ana Akış
- Ana sayfadan marka/model/kategori seç → Usta listesi
- Usta detay → Ustayı seç → İş emri oluştur
- İş emri takip → Adımları ilerlet

Teknoloji ve Mimari
- MVC benzeri katmanlama: `controllers/`, `models/`, `services/` (localStorage + mock seed)
- Router: hash tabanlı (SPA)
- Stil: Bootstrap 5 + `public/css/main.css`

Notlar
- Veri kalıcılığı `localStorage` üzerindedir.
- Demo olduğundan doğrulamalar sınırlıdır.


