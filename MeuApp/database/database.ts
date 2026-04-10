import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('chamaobra.db');

// criar tabela
export const createTable = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      senha TEXT
    );
  `);
};