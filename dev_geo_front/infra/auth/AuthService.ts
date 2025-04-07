import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export class AuthService {
  private static secretKey = process.env.JWT_SECRET!;

  static async getUserIdFromToken(): Promise<string | null> {
    const token = (await cookies()).get('authToken')?.value;

    if (!token) {
      console.error('Usuário não autenticado.');
      return null;
    }

    try {
      const decoded = jwt.verify(token, this.secretKey) as { userId: string };
      return decoded.userId;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return null;
    }
  }
}