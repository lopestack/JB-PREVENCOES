<script setup>
import { ref, onMounted } from 'vue';

// Definindo as variáveis que o seu HTML (template) está usando
const nivelUsuario = ref(null);

onMounted(() => {
  if (process.client) {
    // Busca o nível salvo no localStorage após o login
    nivelUsuario.value = localStorage.getItem('user_nivel');
  }
});

const logout = () => {
  if (process.client) {
    localStorage.removeItem('user_nivel');
    localStorage.removeItem('user_nome');
    window.location.href = '/'; // Recarrega a página para resetar o estado
  }
};
</script>

<template>
  <div class="min-h-screen bg-white text-invictus-black font-sans">
    <div class="bg-invictus-black text-white text-[11px] md:text-xs text-center py-2 uppercase tracking-widest font-bold">
      <span class="text-invictus-orange">Frete Grátis</span> nas compras a partir de R$ 349
    </div>

    <header class="border-b border-gray-200">
      <div class="container mx-auto px-4 py-5 flex items-center justify-between">
        <h1 class="text-3xl md:text-4xl font-black uppercase tracking-tighter cursor-pointer">
          JB PREVENÇÕES<span class="text-invictus-orange"></span>
        </h1>
        
        <div class="hidden md:flex flex-1 max-w-2xl mx-10">
          <div class="relative w-full">
            <input type="text" placeholder="O QUE VOCÊ ESTÁ BUSCANDO?" class="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-xs font-bold tracking-wider focus:outline-none focus:border-invictus-orange transition">
            <button class="absolute right-4 top-3 text-xl hover:text-invictus-orange transition">
              ⌕
            </button>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <!-- Se NÃO estiver logado, mostra o Entrar que você achou -->
          <div 
            v-if="!nivelUsuario" 
            @click="$router.push('/login')"
            class="text-xs font-bold hidden md:block cursor-pointer hover:text-invictus-orange uppercase tracking-wider"
          >
            Entrar
          </div>

          <!-- Se for ADMIN, mostra o link do Painel -->
          <div 
            v-else-if="nivelUsuario === 'admin'" 
            @click="$router.push('/admin/dashboard')"
            class="text-xs font-bold hidden md:block cursor-pointer text-invictus-orange uppercase tracking-wider"
          >
            Painel Admin
          </div>

          <!-- Se for CLIENTE, mostra a opção de Sair -->
          <div 
            v-else 
            @click="logout"
            class="text-xs font-bold hidden md:block cursor-pointer hover:text-red-500 uppercase tracking-wider"
          >
            Sair
          </div>
        </div>
      </div>


      <nav class="container mx-auto px-4 py-3 hidden md:flex justify-center space-x-10 text-[13px] font-black uppercase tracking-widest text-gray-800">
        <a href="#" class="hover:text-invictus-orange transition">Mochilas e Malas</a>
        <a href="#" class="hover:text-invictus-orange transition">Calçados</a>
        <a href="#" class="hover:text-invictus-orange transition">Roupas</a>
        <a href="#" class="hover:text-invictus-orange transition">Equipamentos</a>
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer class="bg-invictus-dark text-white py-12 mt-20">
      <div class="container mx-auto px-4 text-center">
        <p class="font-black tracking-widest uppercase text-2xl">Pronto pra <span class="text-invictus-orange">Tudo.</span></p>
      </div>
    </footer>
  </div>
</template>