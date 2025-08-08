const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME türleri
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS request için
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let filePath = req.url;
  
  // Ana sayfa için index.html
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  }
  
  // Favicon için özel handling
  if (filePath === '/favicon.ico') {
    res.status(204).end();
    return;
  }
  
  // Dosya yolunu düzelt
  const fullPath = path.join(process.cwd(), filePath);
  
  // Dosya uzantısını al
  const extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Dosyayı oku
  fs.readFile(fullPath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Dosya bulunamadı, index.html'e yönlendir (SPA için)
        const indexPath = path.join(process.cwd(), 'index.html');
        fs.readFile(indexPath, (err, content) => {
          if (err) {
            res.status(500).json({ error: 'Sunucu hatası!' });
          } else {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(content);
          }
        });
      } else {
        res.status(500).json({ error: 'Sunucu hatası: ' + error.code });
      }
    } else {
      res.setHeader('Content-Type', contentType);
      res.status(200).send(content);
    }
  });
};
