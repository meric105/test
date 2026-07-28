import express from 'express';
import { OyuncuController } from './controllers/OyuncuController.js';
import config from './config.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/oyuncular', OyuncuController.oyunculariGetir);
app.post('/oyuncular', OyuncuController.oyuncuEkle);
app.get('/health', (req, res) => {
res.status(200).json({ durum: "Aktif" });
});
app.delete('/oyuncular/:id', OyuncuController.sil);
app.listen(config.port, () => {
    console.log(`Sunucu ${config.port} portunda çalışıyor...`);
});
