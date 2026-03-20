<script setup>
import { ref, onMounted } from 'vue';
import { useCart } from '../composables/useCart';

const produtos = ref([]);
const { addToCart } = useCart(); 

// Nossos produtos de teste para não deixar a vitrine vazia
const mockProdutos = [
  { id: 1, nome: "Mochila Seal 2.0 40L", preco: 499.00, categoria: "Mochilas", imagem_url: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=MOCHILA+SEAL" },
  { id: 2, nome: "Camisa Polo Division", preco: 159.90, categoria: "Vestuário", imagem_url: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=POLO+DIVISION" },
  { id: 3, nome: "Bolsa Urban 2.0", preco: 309.00, categoria: "Equipamentos", imagem_url: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=BOLSA+URBAN" },
  { id: 4, nome: "Coturno Acero", preco: 349.50, categoria: "Calçados", imagem_url: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=COTURNO+ACERO" }
];

onMounted(async () => {
  try {
    // 1. Tenta buscar do banco de dados real
    const res = await fetch('http://localhost:3001/api/produtos');
    const dadosBanco = await res.json();
    
    // 2. Se tiver produto no banco, mostra eles. Se estiver vazio, mostra os de teste!
    if (dadosBanco.length > 0) {
      produtos.value = dadosBanco;
    } else {
      produtos.value = mockProdutos;
    }

  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    produtos.value = mockProdutos; // Se o servidor Node estiver desligado, mostra os de teste
  }
});
</script>

<template>
  <div>
    <div class="w-full bg-slate-900 h-[400px] flex flex-col items-center justify-center text-white text-center px-4 mb-16 border-b-4 border-orange-600">
      <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Lançamentos</h2>
      <p class="text-sm md:text-lg font-bold tracking-widest mb-8 text-gray-300">NOVA COLEÇÃO DE VESTUÁRIO E EQUIPAMENTOS</p>
      <button class="bg-orange-600 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition duration-300">
        Comprar Agora
      </button>
    </div>

    <div class="container mx-auto px-4 md:px-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-black">
          Destaques
        </h2>
        <div class="w-16 h-1 bg-orange-600 mx-auto mt-4"></div>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 pb-20">
        <ProductCard 
          v-for="produto in produtos" 
          :key="produto.id"
          :name="produto.nome"
          :price="produto.preco"
          :category="produto.categoria"
          :image="produto.imagem_url"
          @click="addToCart(produto)" 
        />
      </div>
      
      <div v-if="produtos.length === 0" class="text-center text-gray-500 font-bold mb-20">
        Nenhum produto cadastrado ainda. Acesse o Painel Admin para cadastrar.
      </div>
    </div>
  </div>
</template>