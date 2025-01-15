const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = 3000;

// Dosya yükleme için middleware
app.use(fileUpload());
// Statik dosyalar için 'uploads' klasörünü kullan
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// HTML için ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Dosya yükleme rotası
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Dosya yüklenmedi.');
    }

    let uploadedFile = req.files.file;
    let uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Dosya yüklenirken hata oluştu.');
        }

        res.send(`<p>Dosya başarıyla yüklendi: <a href="/uploads/${uploadedFile.name}">${uploadedFile.name}</a></p>`);
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
