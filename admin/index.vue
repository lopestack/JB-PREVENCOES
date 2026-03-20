<script setup>
import { onMounted, ref } from 'vue';

const nomeAdmin = ref('');

onMounted(() => {
  const nivel = localStorage.getItem('user_nivel');
  // Se não for 1, expulsa da página admin
  if (String(nivel) !== '1') {
    window.location.href = '/login';
  }
});

const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Menu Lateral -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
      <div class="p-6 text-2xl font-black border-b border-slate-800 text-orange-500">
        JB ADMIN
      </div>
      <nav class="flex-1 p-4 space-y-2 font-bold">
        <NuxtLink to="/admin/clientes" class="block p-3 hover:bg-orange-600 rounded transition">👥 Clientes</NuxtLink>
        <NuxtLink to="/admin/produtos" class="block p-3 hover:bg-orange-600 rounded transition">📦 Produtos</NuxtLink>
        <NuxtLink to="/admin/pedidos" class="block p-3 hover:bg-orange-600 rounded transition">🛒 Pedidos</NuxtLink>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <button @click="logout" class="w-full text-left p-3 text-red-400 hover:text-red-300 font-bold">Sair</button>
      </div>
    </aside>

    <!-- Conteúdo Central -->
    <main class="flex-1 p-10 overflow-y-auto">
      <header class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-black text-slate-900 uppercase italic">Dashboard</h1>
          <p class="text-gray-500">Bem-vindo de volta, <span class="text-orange-600 font-bold">{{ nomeAdmin }}</span></p>
        </div>
      </header>

      <!-- Cards de Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-blue-500">
          <p class="text-gray-400 text-sm font-bold uppercase mb-2">Clientes</p>
          <p class="text-3xl font-black">24</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-green-500">
          <p class="text-gray-400 text-sm font-bold uppercase mb-2">Produtos Ativos</p>
          <p class="text-3xl font-black">158</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-orange-500">
          <p class="text-gray-400 text-sm font-bold uppercase mb-2">Novos Pedidos</p>
          <p class="text-3xl font-black">7</p>
        </div>
      </div>

      <div class="mt-12 p-10 bg-white rounded-2xl shadow-sm border border-gray-200 text-center">
        <p class="text-gray-400 italic">Selecione uma opção no menu lateral para gerenciar sua loja.</p>
      </div>
    </main>
  </div>
</template>