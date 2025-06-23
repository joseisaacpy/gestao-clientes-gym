// IMPORTS
import { Router } from "express";
import db from "../config/db.js";

// CONTANTES
const router = Router();

// ROTAS
router.post("/", (req, res) => {
  const aluno = req.body;
  if (
    !aluno.nome ||
    !aluno.data_nascimento ||
    !aluno.email ||
    !aluno.telefone
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos" });
  }
  db.run(
    "INSERT INTO alunos (nome, idade, data_nascimento, email, telefone) VALUES (?, ?, ?, ?, ?)",
    [
      aluno.nome,
      aluno.idade,
      aluno.data_nascimento,
      aluno.email,
      aluno.telefone,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao cadastrar aluno", error: err.message });
      }
    }
  );
  res.status(201).json({ message: "Aluno cadastrado com sucesso" });
});
router.get("/", (req, res) => {
  db.all("SELECT * FROM alunos", [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar alunos", error: err.message });
    }

    if (rows.length === 0) {
      return res.json({ message: "Nenhum aluno cadastrado" });
    }

    res.status(200).json(rows);
  });
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const aluno = req.body;

  db.run(
    "UPDATE alunos SET nome = ?, idade = ?, data_nascimento = ?, email = ?, telefone = ? WHERE id = ?",
    [
      aluno.nome,
      aluno.idade,
      aluno.data_nascimento,
      aluno.email,
      aluno.telefone,
      id,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao atualizar aluno", error: err.message });
      }

      res.status(200).json({ message: "Aluno atualizado com sucesso" });
    }
  );
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM alunos WHERE id = ?", [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar aluno", error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Aluno nao encontrado" });
    }
    res.status(200).json({ message: "Aluno deletado com sucesso" });
  });
});
// EXPORTS
export default router;
