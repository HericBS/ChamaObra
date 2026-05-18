import { db } from './database';

export interface Proposta {
  id: number;
  servicoId: number;
  prestadorId: number;
  valor: number;
  prazo: string;
  descricao: string;
  status: string;
  criado_em: string;
}

export const propostaRepository = {
  insert: (proposta: Omit<Proposta, 'id' | 'criado_em'>) => {
    const now = new Date().toISOString();
    return db.runSync(
      `INSERT INTO propostas (servicoId, prestadorId, valor, prazo, descricao, status, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [proposta.servicoId, proposta.prestadorId, proposta.valor, proposta.prazo, proposta.descricao, proposta.status, now]
    );
  },

  getByServicoId: (servicoId: number) => {
    return db.getAllSync(
      `SELECT p.*, u.nome as prestadorNome
       FROM propostas p
       JOIN usuarios u ON p.prestadorId = u.id
       WHERE p.servicoId = ?
       ORDER BY p.criado_em DESC`,
      [servicoId]
    );
  },

  updateStatus: (id: number, status: string) => {
    return db.runSync(`UPDATE propostas SET status = ? WHERE id = ?`, [status, id]);
  }
};
