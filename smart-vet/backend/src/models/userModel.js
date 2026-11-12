import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const schemaUser = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: /^[^\s@]+[^\s@]+\.[^\s@]+$/
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },
        role: {
            type: String,
            enum: ['administrador', 'veterinario'],
            default: 'veterinario'
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

schemaUser.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

schemaUser.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model('Usuario', schemaUser);

export default Usuario;