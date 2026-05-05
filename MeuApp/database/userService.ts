import { Usuario } from './types';
import { buscarPorEmail, inserirUsuario } from './userRepository';

export const cadastrarUsuario = (usuario: Usuario) => {
  try {
    // 🔹 validação básica
    if (!usuario.nome || !usuario.email || !usuario.senha) {
      return { sucesso: false, mensagem: 'Preencha os campos obrigatórios' };
    }

    // 🔥 validação específica de prestador
    if (usuario.tipo === 'prestador') {
      if (!usuario.servico || !usuario.experiencia) {
        return {
          sucesso: false,
          mensagem: 'Preencha serviço e experiência'
        };
      }
    }

    // 🔹 verificar email duplicado
    const existente = buscarPorEmail(usuario.email);

    if (existente) {
      return { sucesso: false, mensagem: 'Email já cadastrado' };
    }

    // 🔹 inserir no banco
    inserirUsuario(usuario);
    console.log('✅ USUÁRIO CADASTRADO:', usuario.email, usuario.tipo);

    return { sucesso: true };

  } catch (error: any) {
    console.log('🔥 ERRO SQLITE:', error);

    if (error.message?.includes('UNIQUE')) {
      return { sucesso: false, mensagem: 'Email já cadastrado' };
    }

    return { sucesso: false, mensagem: 'Erro ao cadastrar' };
  }
};