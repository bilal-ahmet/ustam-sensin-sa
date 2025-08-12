const app = require('./index.js');
const port = 3001;

app.listen(port, () => {
    console.log(`Yerel sunucu http://localhost:${port} adresinde çalışıyor`);
});
