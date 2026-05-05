import { db } from './database';
import { Usuario } from './types';

export const inserirUsuario = (usuario: Usuario) => {
  db.runSync(
    `INSERT INTO usuarios 
    (nome, email, cpf, senha, tipo, endereco, servico, experiencia)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      usuario.nome,
      usuario.email,
      usuario.cpf ?? null,
      usuario.senha,
      usuario.tipo,
      usuario.endereco ?? null,
      usuario.servico ?? null,
      usuario.experiencia ?? null
    ]
  );
};

export const buscarPorEmail = (email: string) => {
  return db.getFirstSync(
    `SELECT * FROM usuarios WHERE email = ?`,
    [email]
  );
};