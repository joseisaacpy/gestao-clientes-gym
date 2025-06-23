// IMPORTS
import { Router } from "express";
import db from "../config/db.js";

// CONTANTES
const router = Router();

// ROTAS
router.post("/", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res
      .status(400)
      .json({ message: "Usuário e senha são obrigatórios." });
  }

  // Consultar o usuário no banco
  db.get(
    "SELECT * FROM administradores WHERE usuario = ? AND senha = ?",
    [usuario, senha],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao acessar o banco de dados.",
          error: err.message,
        });
      }

      if (!row) {
        // Nenhum usuário encontrado
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
      }

      // Usuário autenticado com sucesso
      res
        .status(200)
        .json({ message: "Login realizado com sucesso!", user: row });
    }
  );
});

export default router;
