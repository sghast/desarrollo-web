import Usuario from '../models/userModel.js'
import generarToken from '../utils/generarToken.js'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios!'
            });
        }

        const userExists = await Usuario.findOne({
            email: email.trim().toLowerCase()
        });

        if (userExists) {
            return res.status(409).json({
                error: 'El usuario ya existe'
            });
        }

        const usuario = await Usuario.create({
            name,
            email,
            password,
            role: 'veterinario'
        });

        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            user: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                role: usuario.role
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'El correo ya está registrado'
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(500).json({
            mensaje: 'Error al registrar usuario'
        });
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'El correo y la contraseña son obligatorios'
            });
        }

        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase()
        }).select('+password');

        if (!usuario) {
            return res.status(401).json({
                error: 'Correo o contraseña incorrectos'
            });
        }

        const passwordCorrecta = await usuario.comparePassword(password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                error: 'Correo o contraseña incorrectos'
            });
        }

        if (!usuario.status) {
            return res.status(403).json({
                error: 'La cuenta está desactivada'
            });
        }

        const token = generarToken(usuario);

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            user: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                role: usuario.role
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
};

export { registerUser, logIn };