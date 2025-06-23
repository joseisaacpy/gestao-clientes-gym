// IMPORTS
import { Router } from "express";
import db from "../config/db.js";

// CONTANTES
const router = Router();

// ROTAS
router.post("/", (req, res) => {
  const adm = req.body;
  if (!adm.usuario || !adm.senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos" });
  }
  db.run("INSERT INTO administradores (usuario, senha) VALUES (?, ?)", [
    adm.usuario,
    adm.senha,
  ]);
  res.status(201).json({ message: "Administrador cadastrado com sucesso" });
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM administradores", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao buscar administradores",
        error: err.message,
      });
    }
    res.status(200).json(rows);
  });
});

export default router;
