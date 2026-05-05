import { db } from './database';
import { Usuario } from './types';

export const loginUsuario = (email: string, senha: string) => {
  try {
    const todosUsuarios = db.getAllSync(
      `SELECT id, email, tipo FROM usuarios`
    );
    console.log('📊 USUÁRIOS NO BANCO:', todosUsuarios);

    // 🔥 AQUI ESTÁ A CORREÇÃO
    const usuario = db.getFirstSync(
      `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
      [email, senha]
    ) as Usuario | null;

    if (!usuario) {
      const usuarioExiste = db.getFirstSync(
        `SELECT id, email, tipo FROM usuarios WHERE email = ?`,
        [email]
      );

      if (usuarioExiste) {
        console.log('⚠️ EMAIL EXISTE MAS SENHA ERRADA');
        return { sucesso: false, mensagem: 'Senha inválida' };
      }

      console.log('❌ EMAIL NÃO ENCONTRADO:', email);
      return { sucesso: false, mensagem: 'Email não cadastrado' };
    }

    // ✅ AGORA NÃO DÁ MAIS ERRO
    console.log('✅ USUÁRIO ENCONTRADO:', usuario.nome, usuario.tipo);

    return { sucesso: true, usuario };

  } catch (error) {
    console.log('🔥 ERRO NO LOGIN:', error);
    return { sucesso: false, mensagem: 'Erro ao fazer login' };
  }
};