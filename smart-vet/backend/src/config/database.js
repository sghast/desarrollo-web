import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexión exitosa con MongoDB')
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`)
        throw error
    }
}

export default connectDB;