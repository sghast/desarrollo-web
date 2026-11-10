const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('Se debe configurar jwtSecret en el archivo .env');
}

app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.json());

const usuario = {
    id: 1,
    nombre: "Alan Javier Reyes Casierra",
    correo: "alan@tienda.com",
    rol: "admin",
    passwordHash: bcrypt.hashSync("alanj16", 10)
}

app.get('/', (req, res) => {
  res.send('API de prueba DAW1 funcionando');
});

const authErrorMessage = "las credenciales son incorrectas"

app.post("/api/auth/login", async (req, res) => {
    // obetener los datos enviados por el cliente
    const { correo, password } = req.body || {};

    // verificar que se enviaron los campos
    if (typeof correo !== "string" || typeof password !== "string" || !correo.trim() || !password) {
        return res.status(400).json({
            mensaje: "el correo y la contraseña son obligatorios"
        });
    }

    // verificar el correo
    if (correo != usuario.correo) {
        return res.status(401).json({
            mensaje: authErrorMessage
        });
    }
    
    // verificar la contraseña
    const passwordOK = await bcrypt.compare(password, usuario.passwordHash);
    
    if (!passwordOK) {
        return res.status(401).json({
            mensaje: authErrorMessage
        });
    }
    
    // generar token jwt
    const token = jwt.sign(
        {
            id: usuario.id,
            rol: usuario.rol
        }, jwtSecret,
        {
            expiresIn: "1h",
            algorithm: "HS256"
        }
    );

    // devolver respuesta exitosa
    return res.status(200).json({
        mensaje: "Inicio de sesión completado con éxito",
        token: token,
        usuario: {  
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        }
    });
});

app.listen(port, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${port}`);
});



