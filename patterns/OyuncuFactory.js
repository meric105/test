export const OyuncuFactory = (id, kullaniciAdi, seviye) => {
  return {
    id: id,
    kullaniciAdi: kullaniciAdi || 'Misafir',
    seviye: seviye || 1,
    kayitTarihi: new Date().toISOString(),
  };
};
