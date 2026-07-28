import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS
};

if (!config.dbPass || !config.dbUser) {
    console.error("KRİTİK HATA: Gerekli çevresel değişkenler (.env) eksik!");
    process.exit(1); 
}

export default config;