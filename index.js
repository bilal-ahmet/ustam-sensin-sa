const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// EJS'yi view engine olarak ayarla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statik dosyalar için public klasörünü kullan
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa için route
app.get('/', (req, res) => {
    res.render('index', { title: 'Ustam Sensin' });
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
