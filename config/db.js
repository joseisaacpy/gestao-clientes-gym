// Importa o sqlite
import sqlite3 from "sqlite3";

// Cria conexão com o banco
const db = new sqlite3.Database("./src/database/database.db");

// Cria tabela de alunos se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER,
    data_nascimento TEXT,
    email TEXT,
    telefone TEXT,
    data_cadastro TEXT DEFAULT (date('now')) -- salva a data atual automaticamente
    );
`);

export default db;
