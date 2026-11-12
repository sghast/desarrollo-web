import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/database.js';

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en: http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(`Error al realizar la conexión: ${error.message}`);
        process.exit(1);
    }
}

iniciarServidor()