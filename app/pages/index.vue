<script setup>
import { onMounted } from 'vue';

// 1. Definição dos dados (Produtos)
const produtos = [
  { id: 1, nome: "Mochila Seal 2.0 40L - Verde", preco: 499.00, categoria: "Mochilas", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=MOCHILA+SEAL" },
  { id: 2, nome: "Camisa Polo Division Light", preco: 159.90, categoria: "Vestuário", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=POLO+DIVISION" },
  { id: 3, nome: "Bolsa de Ombro Urban 2.0", preco: 309.00, categoria: "Equipamentos", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=BOLSA+URBAN" },
  { id: 4, nome: "Jaqueta Square - Cáqui", preco: 399.00, categoria: "Vestuário", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=JAQUETA+SQUARE" },
  { id: 5, nome: "Camiseta Piquet Comfort", preco: 111.20, categoria: "Vestuário", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=CAMISETA+PIQUET" },
  { id: 6, nome: "Óculos Tático Focus", preco: 259.00, categoria: "Acessórios", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=OCULOS+FOCUS" },
  { id: 7, nome: "Regata Speed - Grafite", preco: 109.00, categoria: "Vestuário", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=REGATA+SPEED" },
  { id: 8, nome: "Coturno Militar Acero", preco: 349.50, categoria: "Calçados", imagem: "https://via.placeholder.com/400x400/f4f4f4/ff4c00?text=COTURNO+ACERO" }
];

// 2. Lógica de Segurança e Inicialização
onMounted(() => {
  const nivel = localStorage.getItem('user_nivel');
  if (nivel !== 'admin') {
    // Se não for admin, manda de volta para o login
    window.location.href = '/login';
  }
});
</script>

<template>
  <div>
    <!-- Banner de Lançamentos -->
    <div class="w-full bg-slate-900 h-[400px] flex flex-col items-center justify-center text-white text-center px-4 mb-16 border-b-4 border-orange-600">
      <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Lançamentos</h2>
      <p class="text-sm md:text-lg font-bold tracking-widest mb-8 text-gray-300">NOVA COLEÇÃO DE VESTUÁRIO E EQUIPAMENTOS</p>
      <button class="bg-orange-600 text-white px-10 py-4 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition duration-300">
        Comprar Agora
      </button>
    </div>

    <!-- Seção de Destaques -->
    <div class="container mx-auto px-4 md:px-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-black uppercase tracking-tighter text-black">
          Destaques
        </h2>
        <div class="w-16 h-1 bg-orange-600 mx-auto mt-4"></div>
      </div>
      
      <!-- Grid de Produtos -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 pb-20">
        <ProductCard 
          v-for="produto in produtos" 
          :key="produto.id"
          :name="produto.nome"
          :price="produto.preco"
          :category="produto.categoria"
          :image="produto.imagem"
        />
      </div>
    </div>
  </div>
</template>