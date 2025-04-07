export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string
  ) {
    
  }
  updateProfile(update: Partial<{ name: string; email: string; password: string }>) {
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