// IMPORTS
import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// CONTANTES
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// CONFIGURAÇÕES
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));

// ROTAS
// rota principal com arquivo home.html
app.get("/", (req, res) => res.redirect("home.html"));
// rota para login.html
app.get("/login", (req, res) => res.redirect("login.html"));

// OUVINTE DE SERVIDOR
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
