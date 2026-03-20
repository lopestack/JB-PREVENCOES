const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Permite que o seu frontend (porta 3000) converse com este backend sem ser bloqueado
app.use(cors());
// Permite que o backend entenda JSON
app.use(express.json());

// Conecta ao SQLite
const db = new sqlite3.Database('./banco.sqlite', (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite com sucesso!");
  }
});

// ==========================================
// INICIALIZAÇÃO DO BANCO DE DADOS (Criação das Tabelas)
// ==========================================
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    nivel TEXT DEFAULT '0'
)`);

db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT,
    preco REAL DEFAULT 0,
    estoque INTEGER DEFAULT 0,
    descricao TEXT,
    imagem_url TEXT
)`);

// ==========================================
// ROTA: CADASTRO
// ==========================================
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = `INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, '0')`;
  
  db.run(sql, [nome, email, senha], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ success: false, message: "Este e-mail já está cadastrado." });
      }
      return res.status(500).json({ success: false, message: "Erro no banco: " + err.message });
    }
    res.json({ success: true, message: "Alistamento concluído!" });
  });
});

// ==========================================
// ROTA: LOGIN
// ==========================================
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;
  
  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro no banco: " + err.message });
    }
    if (row) {
      // TRUQUE DE MESTRE:
      // Se o email for o seu, força para nível '1' (Admin).
      // Se for qualquer outro, pega o nível real do banco (que é '0' por padrão).
      const nivelCorreto = (row.email === 'adminjbprev@gmail.com') ? '1' : row.nivel;

      res.json({ success: true, nome: row.nome, nivel: nivelCorreto });
    } else {
      res.status(401).json({ success: false, message: "Credenciais inválidas, soldado." });
    }
  });
});

// ==========================================
// ROTA: BUSCAR PRODUTOS (GET)
// ==========================================
app.get('/api/produtos', (req, res) => {
  db.all(`SELECT * FROM produtos ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(rows);
  });
});

// ==========================================
// ROTA: CADASTRAR PRODUTO (POST)
// ==========================================
app.post('/api/produtos', (req, res) => {
  const { nome, categoria, preco, estoque, descricao, imagem_url } = req.body;
  const sql = `INSERT INTO produtos (nome, categoria, preco, estoque, descricao, imagem_url) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [nome, categoria, preco || 0, estoque || 0, descricao, imagem_url], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// ==========================================
// ROTA: ATUALIZAR PRODUTO (PUT)
// ==========================================
app.put('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, categoria, preco, estoque, descricao, imagem_url } = req.body;
  
  const sql = `UPDATE produtos SET nome = ?, categoria = ?, preco = ?, estoque = ?, descricao = ?, imagem_url = ? WHERE id = ?`;
  
  db.run(sql, [nome, categoria, preco || 0, estoque || 0, descricao, imagem_url, id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, changes: this.changes });
  });
});

// ==========================================
// ROTA: DELETAR PRODUTO (DELETE)
// ==========================================
app.delete('/api/produtos/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM produtos WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, changes: this.changes });
  });
});

// ==========================================
// LIGAR O SERVIDOR
// ==========================================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});