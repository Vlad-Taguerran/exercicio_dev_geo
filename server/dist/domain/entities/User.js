"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    updateProfile(update) {
        if (update.name !== undefined) {
            if (!update.name.trim()) {
                throw new Error('Nome inválido');
            }
            this.name = update.name;
        }
        if (update.email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!update.email.trim() || !emailRegex.test(update.email)) {
                throw new Error('Email inválido');
            }
            this.email = update.email;
        }
        if (update.password !== undefined) {
            if (update.password.length < 6) {
                throw new Error('Senha muito curta');
            }
            this.password = update.password;
        }
    }
}
exports.User = User;
