import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('chamaobra.db');

// criar tabelas
export const createTables = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      cpf TEXT,
      senha TEXT,
      tipo TEXT,
      endereco TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS prestadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      servico TEXT,
      experiencia TEXT
    );
  `);
};