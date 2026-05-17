import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('chamaObra.db');

export const initDB = () => {
  // tabela base
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      senha TEXT
    );
  `);

  // tabela de serviços
  db.execSync(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER,
      titulo TEXT,
      descricao TEXT,
      metragem TEXT,
      categoria TEXT,
      urgencia TEXT,
      materiais TEXT,
      endereco TEXT,
      status TEXT DEFAULT 'EM_ANDAMENTO',
      valor REAL,
      criado_em TEXT,
      FOREIGN KEY(clienteId) REFERENCES usuarios(id)
    );
  `);

  // pegar colunas existentes
  const colunas = db.getAllSync(`PRAGMA table_info(usuarios)`);

  const existe = (nome: string) =>
    colunas.some((c: any) => c.name === nome);

  // CAMPOS COMUNS
  if (!existe('nome')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN nome TEXT;`);
  }

  if (!existe('cpf')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN cpf TEXT;`);
  }

  if (!existe('tipo')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN tipo TEXT;`);
  }

  if (!existe('endereco')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN endereco TEXT;`);
  }

  // 🔥 CAMPOS DO PRESTADOR
  if (!existe('servico')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN servico TEXT;`);
  }

  if (!existe('experiencia')) {
    db.execSync(`ALTER TABLE usuarios ADD COLUMN experiencia TEXT;`);
  }
};