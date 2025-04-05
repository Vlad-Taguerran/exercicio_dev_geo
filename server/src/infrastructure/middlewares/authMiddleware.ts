import { NextFunction,Request,Response } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { UserPayload } from '../interfaces/UserPayload';



const secretKey = process.env.JWT_SECRET || '2d3d8b43fa0cb7929eeacc30f52d7e5b4b3f52adb923497e4549f7b5cb26292b'

// Middleware de autenticação
export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 
  console.log(token)
  if (token == null) {
    res.sendStatus(401);
    return ;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('Erro ao verificar token:', err);
       res.sendStatus(403); 
       return;
    }

    // Se a verificação for bem-sucedida, adicione as informações do usuário ao objeto de requisição
    req.user = user as UserPayload;
    next(); // Passa para o próximo middleware ou rota
  });
};