<script setup>
import { ref, onMounted } from 'vue';

const mostrarForm = ref(false);
const produtoEmEdicao = ref(null); // Guarda o ID do produto que está sendo editado
const listaProdutos = ref([]);

const produto = ref({
  nome: '',
  categoria: '',
  preco: '',
  estoque: '',
  descricao: '',
  imagem_url: ''
});

// Busca os produtos do Backend Node.js
const carregarProdutos = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/produtos');
    listaProdutos.value = await res.json();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

// Abre o formulário limpo
const novoProduto = () => {
  produtoEmEdicao.value = null;
  produto.value = { nome: '', categoria: '', preco: '', estoque: '', descricao: '', imagem_url: '' };
  mostrarForm.value = true;
};

// Abre o formulário preenchido com os dados do produto clicado
const editarProduto = (item) => {
  produtoEmEdicao.value = item.id;
  produto.value = { ...item }; // Copia os dados para o formulário
  mostrarForm.value = true;
};

// Cancela e fecha o formulário
const cancelarForm = () => {
  mostrarForm.value = false;
  produtoEmEdicao.value = null;
};

// Salva (cria um novo) ou Atualiza o produto
const salvarProduto = async () => {
  try {
    const isEdit = !!produtoEmEdicao.value;
    const url = isEdit ? `http://localhost:3001/api/produtos/${produtoEmEdicao.value}` : 'http://localhost:3001/api/produtos';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto.value)
    });
    
    const dados = await res.json();
    if (dados.success) {
      alert(isEdit ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!");
      cancelarForm();
      carregarProdutos(); // Atualiza a tabela
    } else {
      alert("Erro ao salvar: " + dados.error);
    }
  } catch (error) {
    alert("Erro de conexão com o servidor.");
  }
};

// Exclui o produto
const excluirProduto = async (id) => {
  if (!confirm("Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.")) return;

  try {
    const res = await fetch(`http://localhost:3001/api/produtos/${id}`, {
      method: 'DELETE'
    });
    const dados = await res.json();
    if (dados.success) {
      carregarProdutos(); // Atualiza a tabela
    } else {
      alert("Erro ao excluir: " + dados.error);
    }
  } catch (error) {
    alert("Erro de conexão com o servidor.");
  }
};

onMounted(() => {
  const nivel = localStorage.getItem('user_nivel');
  if (String(nivel) !== '1') {
    window.location.href = '/login';
  } else {
    carregarProdutos();
  }
});

const logout = () => {
  localStorage.removeItem('user_nivel');
  localStorage.removeItem('user_nome');
  window.location.href = '/login';
};
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    
    <aside class="w-64 bg-invictus-black text-white flex flex-col shadow-xl z-10">
      <div class="p-6 text-2xl font-black border-b border-gray-800 text-invictus-orange uppercase tracking-widest">
        Base JB
      </div>
      <nav class="flex-1 p-4 space-y-2 font-bold text-sm uppercase tracking-wider">
        <NuxtLink to="/admin" class="block p-3 hover:bg-gray-800 rounded transition">📊 Dashboard</NuxtLink>
        <NuxtLink to="/admin/produtos" class="block p-3 bg-invictus-orange text-white rounded transition">📦 Produtos</NuxtLink>
      </nav>
      
      <div class="p-4 border-t border-gray-800 space-y-3">
        <NuxtLink to="/" class="block text-center p-3 text-gray-300 hover:text-white font-bold uppercase tracking-widest border border-gray-600 hover:border-white transition">
          Ver Loja
        </NuxtLink>
        <button @click="logout" class="w-full text-center p-3 text-white bg-red-600 hover:bg-red-500 font-bold uppercase tracking-widest transition">
          Sair
        </button>
      </div>
    </aside>

    <main class="flex-1 p-10 overflow-y-auto">
      <div class="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 class="text-3xl font-black text-invictus-black uppercase tracking-tighter">Gerenciar Produtos</h1>
        <button v-if="!mostrarForm" @click="novoProduto" class="bg-invictus-orange text-white px-6 py-3 font-black uppercase tracking-widest hover:bg-invictus-black transition duration-300">
          + Novo Produto
        </button>
      </div>

      <div v-if="mostrarForm" class="bg-white p-8 shadow-sm mb-8 border-t-4 border-invictus-orange relative">
        <button @click="cancelarForm" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs">Cancelar ✕</button>
        
        <h2 class="text-xl font-black uppercase tracking-widest mb-6">
          {{ produtoEmEdicao ? 'Atualizar Produto' : 'Cadastrar Novo Item' }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest mb-1">Nome do Produto</label>
            <input v-model="produto.nome" type="text" class="w-full border-2 border-gray-200 p-3 focus:border-invictus-orange outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest mb-1">Categoria</label>
            <input v-model="produto.categoria" type="text" placeholder="Ex: Mochilas" class="w-full border-2 border-gray-200 p-3 focus:border-invictus-orange outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest mb-1">Preço (R$)</label>
            <input v-model="produto.preco" type="number" placeholder="Ex: 199.90" class="w-full border-2 border-gray-200 p-3 focus:border-invictus-orange outline-none" />
          </div>
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest mb-1">Estoque</label>
            <input v-model="produto.estoque" type="number" class="w-full border-2 border-gray-200 p-3 focus:border-invictus-orange outline-none" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-[10px] font-black uppercase tracking-widest mb-1">URL da Imagem</label>
            <input v-model="produto.imagem_url" type="text" placeholder="Link da foto" class="w-full border-2 border-gray-200 p-3 focus:border-invictus-orange outline-none" />
          </div>
        </div>
        <button @click="salvarProduto" class="mt-6 bg-invictus-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-invictus-orange w-full transition duration-300">
          {{ produtoEmEdicao ? 'Salvar Alterações' : 'Adicionar ao Arsenal' }}
        </button>
      </div>

      <div class="bg-white shadow-sm overflow-hidden border border-gray-200">
        <table class="w-full text-left border-collapse">
          <thead class="bg-invictus-black text-white text-xs uppercase tracking-widest">
            <tr>
              <th class="p-4">Produto</th>
              <th class="p-4">Categoria</th>
              <th class="p-4">Preço</th>
              <th class="p-4">Estoque</th>
              <th class="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="listaProdutos.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-500 font-bold uppercase tracking-widest">Nenhum produto cadastrado no banco de dados.</td>
            </tr>
            <tr v-for="item in listaProdutos" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
              <td class="p-4 font-bold text-sm uppercase text-gray-800">{{ item.nome }}</td>
              <td class="p-4 text-sm text-gray-500 uppercase tracking-wider">{{ item.categoria }}</td>
              <td class="p-4 text-invictus-orange font-black">R$ {{ Number(item.preco).toFixed(2).replace('.', ',') }}</td>
              <td class="p-4 text-sm font-bold text-gray-600">{{ item.estoque }} un</td>
              <td class="p-4 text-center space-x-4">
                <button @click="editarProduto(item)" class="text-xs font-bold uppercase tracking-widest text-blue-500 hover:text-blue-700">Editar</button>
                <button @click="excluirProduto(item.id)" class="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>