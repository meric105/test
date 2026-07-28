import { oyuncular } from '../database/db.js';

export const OyuncuRepository = {
    getAll: () => oyuncular,
    create: (yeniOyuncu) => oyuncular.push(yeniOyuncu),
    getir: (id) => oyuncular.find(o => o.id === id),
    
    sil: (id) => {
    const index = oyuncular.findIndex(o => o.id == id); 
    if (index !== -1) {
        oyuncular.splice(index, 1);
        return true; 
    }
    return false;
}
};