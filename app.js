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
// ROTA PRINCIPAL com arquivo index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "index.html"))
);

// OUVINTE DE SERVIDOR
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
