import { OyuncuService } from '../services/OyuncuService.js';

export const OyuncuController = {
  oyunculariGetir: (req, res) => {
    const veriler = OyuncuService.getir();
    res.json(veriler);
  },

  oyuncuEkle: (req, res) => {
    const { kullaniciAdi, seviye } = req.body;
    const sonuc = OyuncuService.ekle(kullaniciAdi, seviye);
    res.status(201).json({ mesaj: 'Oyuncu başarıyla eklendi', veri: sonuc });
  },
  sil: (req, res) => {
    const id = parseInt(req.params.id, 10);

    const sonuc = OyuncuService.oyuncuSil(id);

    if (!sonuc) {
      return res.status(404).json({ hata: 'Oyuncu bulunamadı!' });
    }
    res.status(200).json({ mesaj: 'Oyuncu sistemden silindi.' });
  },
};
