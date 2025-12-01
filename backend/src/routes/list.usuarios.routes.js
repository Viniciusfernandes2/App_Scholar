const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Somente ADMIN pode ver todos os usuários
router.get("/", auth, role("admin"), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true
      }
    });

    // Como a senha é sempre 123456 para novos usuários, adicionamos manualmente
    const formatted = users.map(u => ({
      ...u,
      senha: "123456" // senha padrão
    }));

    res.json(formatted);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

module.exports = router;
