<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-black text-slate-800">GERENCIAR PRODUTOS</h1>
      <button @click="mostrarForm = !mostrarForm" class="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600">
        {{ mostrarForm ? 'Cancelar' : '+ Novo Produto' }}
      </button>
    </div>

    <div v-if="mostrarForm" class="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
      <h2 class="text-xl font-bold mb-4">Cadastrar Novo Item</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="produto.nome" type="text" placeholder="Nome do Produto" class="border p-2 rounded" />
        <input v-model="produto.categoria" type="text" placeholder="Categoria (ex: Tático, Botas)" class="border p-2 rounded" />
        <input v-model="produto.preco" type="number" placeholder="Preço (Ex: 199.90)" class="border p-2 rounded" />
        <input v-model="produto.estoque" type="number" placeholder="Quantidade em Estoque" class="border p-2 rounded" />
        <input v-model="produto.imagem_url" type="text" placeholder="URL da Imagem (Link)" class="border p-2 rounded md:col-span-2" />
        <textarea v-model="produto.descricao" placeholder="Descrição Detalhada" class="border p-2 rounded md:col-span-2 h-24"></textarea>
      </div>
      <button @click="salvarProduto" class="mt-4 bg-green-600 text-white px-8 py-2 rounded font-bold hover:bg-green-700 w-full">
        SALVAR NO BANCO DE DADOS
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="p-4">Produto</th>
            <th class="p-4">Categoria</th>
            <th class="p-4">Preço</th>
            <th class="p-4">Estoque</th>
            <th class="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listaProdutos" :key="item.id" class="border-b hover:bg-gray-50">
            <td class="p-4 font-semibold">{{ item.nome }}</td>
            <td class="p-4">{{ item.categoria }}</td>
            <td class="p-4 text-green-600 font-bold">R$ {{ item.preco }}</td>
            <td class="p-4">{{ item.estoque }} un</td>
            <td class="p-4">
              <button class="text-blue-500 mr-2">Editar</button>
              <button class="text-red-500">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mostrarForm = ref(false);
const listaProdutos = ref([]);
const produto = ref({
  nome: '',
  categoria: '',
  preco: '',
  estoque: '',
  descricao: '',
  imagem_url: ''
});

// Função para buscar produtos do banco
const carregarProdutos = async () => {
  const res = await fetch('http://localhost/Loja/loja-tatica/api/produtos.php');
  listaProdutos.value = await res.json();
};

// Função para salvar novo produto
const salvarProduto = async () => {
  const res = await fetch('http://localhost/Loja/loja-tatica/api/produtos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto.value)
  });
  
  const dados = await res.json();
  if (dados.success) {
    alert("Produto cadastrado!");
    mostrarForm.value = false;
    carregarProdutos(); // Atualiza a tabela
  }
};

onMounted(carregarProdutos);
</script>