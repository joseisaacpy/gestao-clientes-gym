// IMPORTS
import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import alunoRouter from "./routers/alunosRoutes.js";
import admRouter from "./routers/admsRoutes.js";
import loginRouter from "./routers/loginRoutes.js";
import bodyParser from "body-parser";

// CONTANTES
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// CONFIGURAÇÕES
dotenv.config();

// MIDDLEWARES E ROTAS
app.use(bodyParser.urlencoded({ extended: false })); // Para ler dados de formulário (x-www-form-urlencoded)
app.use(bodyParser.json()); // Para ler JSON
app.use(express.static(path.join(__dirname, "views")));
app.use("/alunos", alunoRouter);
app.use("/adm", admRouter);
app.use("/login", loginRouter);

// ROTAS
// rota principal com arquivo home.html
app.get("/", (req, res) => res.redirect("home.html"));
// rota para login.html
app.get("/login", (req, res) => res.redirect("login.html"));
// rota para o painel
app.get("/painel", (req, res) => {
  res.redirect("painel.html");
});

// OUVINTE DE SERVIDOR
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
