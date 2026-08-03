import { OyuncuRepository } from '../repositories/OyuncuRepository.js';
import { OyuncuFactory } from '../patterns/OyuncuFactory.js';

export const OyuncuService = {
  getir: () => {
    return OyuncuRepository.getAll();
  },

  ekle: (kullaniciAdi, seviye) => {
    const mevcutlar = OyuncuRepository.getAll();
    const yeniId =
      mevcutlar.length > 0 ? Math.max(...mevcutlar.map((o) => o.id)) + 1 : 1;

    const yeniOyuncu = OyuncuFactory(yeniId, kullaniciAdi, seviye);

    OyuncuRepository.create(yeniOyuncu);
    return yeniOyuncu;
  },
  oyuncuSil: (id) => {
    const oyuncu = OyuncuRepository.getir(id);
    if (!oyuncu) {
      return false;
    }

    OyuncuRepository.sil(id);
    return true;
  },
};
