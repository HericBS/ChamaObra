import { db } from './database';
import { Servico } from './types';

export const servicoRepository = {
  insert: (servico: Omit<Servico, 'id' | 'criado_em'>) => {
    const now = new Date().toISOString();
    return db.runSync(
      `INSERT INTO servicos (clienteId, titulo, descricao, metragem, categoria, urgencia, materiais, endereco, status, valor, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        servico.clienteId,
        servico.titulo,
        servico.descricao,
        servico.metragem,
        servico.categoria,
        servico.urgencia,
        servico.materiais,
        servico.endereco,
        servico.status,
        servico.valor || null,
        now
      ]
    );
  },

  getByClienteId: (clienteId: number) => {
    return db.getAllSync(`SELECT * FROM servicos WHERE clienteId = ? ORDER BY criado_em DESC`, [clienteId]);
  },

  getByStatus: (clienteId: number, status: string) => {
    return db.getAllSync(`SELECT * FROM servicos WHERE clienteId = ? AND status = ? ORDER BY criado_em DESC`, [clienteId, status]);
  },
};