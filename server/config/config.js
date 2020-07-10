// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Base de datos
// =============================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/impresoras';
} else {
    urlDB = 'mongodb+srv://msuin:Elcijote99@cluster0.xpsal.mongodb.net/impresoras'
}

process.env.URLDB = urlDB;