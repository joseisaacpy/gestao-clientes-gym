// Importa o sqlite
import sqlite3 from "sqlite3";

// Cria conexão com o banco
const db = new sqlite3.Database("./src/database/database.db");

// Cria tabela de alunos se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER ,
    data_nascimento DATE,
    email TEXT,
    telefone TEXT,
    data_cadastro DATE DEFAULT (date('now')) -- salva a data atual automaticamente
    );
`);

// Cria tabela de adminstradores do sistema se nao existir
db.run(`
    CREATE TABLE IF NOT EXISTS administradores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
    );
`);

export default db;
