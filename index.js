const express = require('express');
const path = require('path');

const app = express();

// EJS'yi view engine olarak ayarla
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statik dosyalar için public klasörünü kullan
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa için route
app.get('/', (req, res) => {
    res.render('index', { title: 'Ustam Sensin' });
});

// Vercel'in uygulamayı kullanabilmesi için dışa aktar
module.exports = app;
