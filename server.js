const app = require('./index.js');
const express = require('express');
const path = require('path');
const port = 3001;

// Yerel geliştirme için statik dosya sunumunu burada etkinleştiriyoruz.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Yerel sunucu http://localhost:${port} adresinde çalışıyor`);
});
