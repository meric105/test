import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

// ==========================================
// VERİ MODELİ (INTERFACE)
// ==========================================
// Oyuncu objesinin tam olarak hangi özellikleri taşıyacağını belirliyoruz.
interface Oyuncu {
    id: number;
    kullaniciAdi: string;
    seviye: number;
}

// Dizi artık sadece 'Oyuncu' yapısına uyan verileri kabul edecek.
let oyuncular: Oyuncu[] = [
    { id: 1, kullaniciAdi: "meric", seviye: 45 }
];

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const saat = new Date().toLocaleTimeString();
    console.log(`[${saat}] ${req.method} isteği geldi -> ${req.originalUrl}`);
    next(); 
});

// ==========================================
// ENDPOINT'LER
// ==========================================
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ durum: "Aktif", mesaj: "Sistem sorunsuz çalışıyor." });
});

app.post('/oyuncular', (req: Request, res: Response) => {
    // Burada yeniOyuncu'nun tipini belirtiyoruz, eksik veya yanlış veri girilmesini editör anında yakalar.
    const yeniOyuncu: Oyuncu = {
        id: oyuncular.length + 1,
        kullaniciAdi: req.body.kullaniciAdi,
        seviye: req.body.seviye
    };
    
    oyuncular.push(yeniOyuncu);
    res.status(201).json({ mesaj: "Oyuncu eklendi", veri: yeniOyuncu });
});

app.get('/oyuncular', (req: Request, res: Response) => {
    const minSeviye = req.query.minSeviye as string;
    
    if (minSeviye) {
        const filtrelenmis = oyuncular.filter(o => o.seviye >= parseInt(minSeviye));
        return res.status(200).json(filtrelenmis);
    }
    
    res.status(200).json(oyuncular);
});

app.get('/oyuncular/:id', (req: Request, res: Response) => {
    const hedefId = parseInt(req.params.id);
    const oyuncu = oyuncular.find(o => o.id === hedefId);

    if (!oyuncu) {
        return res.status(404).json({ hata: "Bu ID'ye sahip bir oyuncu yok." });
    }
    res.status(200).json(oyuncu);
});

app.put('/oyuncular/:id', (req: Request, res: Response) => {
    const hedefId = parseInt(req.params.id);
    const oyuncu = oyuncular.find(o => o.id === hedefId);

    if (!oyuncu) {
        return res.status(404).json({ hata: "Güncellenecek oyuncu bulunamadı." });
    }

    oyuncu.kullaniciAdi = req.body.kullaniciAdi || oyuncu.kullaniciAdi;
    oyuncu.seviye = req.body.seviye || oyuncu.seviye;

    res.status(200).json({ mesaj: "Kayıt güncellendi", veri: oyuncu });
});

app.delete('/oyuncular/:id', (req: Request, res: Response) => {
    const hedefId = parseInt(req.params.id);
    oyuncular = oyuncular.filter(o => o.id !== hedefId);
    
    res.status(200).json({ mesaj: "Oyuncu sistemden silindi." });
});

// ==========================================
// ERROR-HANDLING
// ==========================================
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Sunucu Hatası:", err.message);
    res.status(500).json({ hata: "Sistemsel bir sorun oluştu." });
});

app.listen(PORT, () => {
    console.log(`TypeScript Sunucusu aktif: http://localhost:${PORT}`);
});