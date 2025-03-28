import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

// Middleware para validar se o arquivo CSV existe e se o caminho é válido
export const validateCsvFile = async (req: Request, res: Response, next: NextFunction) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: 'O caminho do arquivo é obrigatório.' });
  }

  try {
    // Verificar se o arquivo existe no sistema
    const fileExists = fs.existsSync(filePath);
    
    if (!fileExists) {
      return res.status(404).json({ error: 'Arquivo CSV não encontrado no caminho fornecido.' });
    }

    // Chama o próximo middleware ou controlador
    next();
  } catch (error) {
    next(error)
  }
};
