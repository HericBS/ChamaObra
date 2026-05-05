export type TipoUsuario = 'contratante' | 'prestador';

export interface Usuario {
  id?: number;

  nome: string;
  email: string;
  cpf?: string;
  senha: string;

  tipo: TipoUsuario;

  endereco?: string;
  criado_em?: string;

  // 🔥 CAMPOS DO PRESTADOR
  servico?: string;
  experiencia?: string;
}