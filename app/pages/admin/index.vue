<script setup>
import { onMounted, ref } from 'vue';

const nomeAdmin = ref('');

onMounted(() => {
  // Segurança: Se não for admin (nível 1), expulsa de volta pra loja
  const nivel = localStorage.getItem('user_nivel');
  if (String(nivel) !== '1') {
    window.location.href = '/login';
  } else {
    nomeAdmin.value = localStorage.getItem('user_nome') || 'Comandante';
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
        <NuxtLink to="/admin" class="block p-3 bg-invictus-orange text-white rounded transition">📊 Dashboard</NuxtLink>
        <NuxtLink to="/admin/produtos" class="block p-3 hover:bg-gray-800 rounded transition">📦 Produtos</NuxtLink>
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
      <header class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-black text-invictus-black uppercase tracking-tighter">Painel de Controle</h1>
          <p class="text-gray-500 font-bold tracking-widest uppercase mt-1">
            Operador logado: <span class="text-invictus-orange">{{ nomeAdmin }}</span>
          </p>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded shadow-sm border-b-4 border-invictus-orange">
          <p class="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-2">Pedidos Hoje</p>
          <p class="text-4xl font-black text-invictus-black">0</p>
        </div>
        <div class="bg-white p-8 rounded shadow-sm border-b-4 border-invictus-black">
          <p class="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-2">Visitas</p>
          <p class="text-4xl font-black text-invictus-black">12</p>
        </div>
        <div class="bg-white p-8 rounded shadow-sm border-b-4 border-gray-300">
          <p class="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-2">Alertas de Estoque</p>
          <p class="text-4xl font-black text-red-500">0</p>
        </div>
      </div>

      <div class="mt-12 p-10 bg-white rounded shadow-sm border border-gray-100 text-center">
        <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">Selecione uma opção no menu lateral para gerenciar sua loja.</p>
      </div>
    </main>
  </div>
</template>