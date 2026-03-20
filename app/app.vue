<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// Importa TODAS as funções do novo carrinho
import { useCart } from './composables/useCart'; 

const { 
  cart, isCartOpen, addToCart, decreaseQuantity, removeFromCart, 
  cartTotal, cartCount, currentCoupon, applyCoupon, removeCoupon, 
  discountAmount, finalTotal 
} = useCart();

const route = useRoute();
const nivelUsuario = ref(null);
const cupomInput = ref(''); // Guarda o que o usuário digita na caixinha de cupom

onMounted(() => {
  if (process.client) {
    nivelUsuario.value = localStorage.getItem('user_nivel');
  }
});

const logout = () => {
  if (process.client) {
    localStorage.removeItem('user_nivel');
    localStorage.removeItem('user_nome');
    window.location.href = '/login'; 
  }
};

// Função para processar o clique no botão "Aplicar Cupom"
const handleApplyCoupon = () => {
  if (!cupomInput.value) return;
  
  const resultado = applyCoupon(cupomInput.value);
  if (!resultado.success) {
    alert(resultado.message); // Se der erro, avisa na tela
  } else {
    cupomInput.value = ''; // Limpa a caixinha se deu certo
  }
};
</script>

<template>
  <div class="min-h-screen bg-white text-invictus-black font-sans relative">
    
    <div v-if="route.path !== '/login' && !route.path.startsWith('/admin')">
      <div class="bg-invictus-black text-white text-[11px] md:text-xs text-center py-2 uppercase tracking-widest font-bold">
        <span class="text-invictus-orange">Frete Grátis</span> nas compras a partir de R$ 349
      </div>

      <header class="border-b border-gray-200">
        <div class="container mx-auto px-4 py-5 flex items-center justify-between">
          <h1 @click="$router.push('/')" class="text-3xl md:text-4xl font-black uppercase tracking-tighter cursor-pointer">
            JB PREVENÇÕES<span class="text-invictus-orange">.</span>
          </h1>
          
          <div class="hidden md:flex flex-1 max-w-2xl mx-10">
            <div class="relative w-full">
              <input type="text" placeholder="O QUE VOCÊ ESTÁ BUSCANDO?" class="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-xs font-bold tracking-wider focus:outline-none focus:border-invictus-orange transition">
              <button class="absolute right-4 top-3 text-xl hover:text-invictus-orange transition">⌕</button>
            </div>
          </div>

          <div class="flex items-center gap-6">
            <div v-if="!nivelUsuario" @click="$router.push('/login')" class="text-xs font-bold hidden md:block cursor-pointer hover:text-invictus-orange uppercase tracking-wider">Entrar</div>
            <div v-else-if="nivelUsuario === 'admin' || nivelUsuario === '1'" @click="$router.push('/admin')" class="text-xs font-bold hidden md:block cursor-pointer text-invictus-orange uppercase tracking-wider">Painel Admin</div>
            <div v-else @click="logout" class="text-xs font-bold hidden md:block cursor-pointer hover:text-red-500 uppercase tracking-wider">Sair</div>
            
            <div @click="isCartOpen = true" class="relative cursor-pointer text-2xl hover:text-invictus-orange transition">
              🛒
              <span v-if="cartCount > 0" class="absolute -top-2 -right-3 bg-invictus-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {{ cartCount }}
              </span>
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
    </div>

    <main>
      <NuxtPage />
    </main>

    <footer v-if="route.path !== '/login' && !route.path.startsWith('/admin')" class="bg-invictus-dark text-white py-12 mt-20">
      <div class="container mx-auto px-4 text-center">
        <p class="font-black tracking-widest uppercase text-2xl">Pronto pra <span class="text-invictus-orange">Tudo.</span></p>
      </div>
    </footer>

    <div v-if="isCartOpen" @click="isCartOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"></div>
    
    <div :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'" class="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col">
      
      <div class="p-6 border-b border-gray-200 flex justify-between items-center bg-invictus-black text-white">
        <h2 class="text-xl font-black uppercase tracking-widest">Seu Loadout</h2>
        <button @click="isCartOpen = false" class="text-gray-400 hover:text-invictus-orange text-3xl leading-none">&times;</button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <div v-if="cart.length === 0" class="text-center text-gray-500 mt-10 font-bold uppercase tracking-wider">
          Seu carrinho está vazio.
        </div>
        
        <div v-else class="space-y-6">
          <div v-for="item in cart" :key="item.id" class="flex gap-4 border-b border-gray-100 pb-4">
            <img :src="item.imagem_url || item.imagem" class="w-24 h-24 object-cover bg-invictus-gray p-2" />
            <div class="flex-1 flex flex-col justify-between">
              
              <div>
                <div class="flex justify-between items-start">
                  <h4 class="text-xs font-bold uppercase leading-tight text-invictus-black mb-1 pr-4">{{ item.nome }}</h4>
                  <button @click="removeFromCart(item.id)" class="text-gray-400 hover:text-red-500 transition">✕</button>
                </div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ item.categoria }}</p>
              </div>

              <div class="flex justify-between items-end mt-4">
                <div class="flex items-center border border-gray-300 rounded-sm">
                  <button @click="decreaseQuantity(item.id)" class="px-3 py-1 text-gray-500 hover:text-invictus-orange hover:bg-gray-100 font-bold transition">-</button>
                  <span class="px-3 py-1 text-xs font-bold border-x border-gray-300 min-w-[32px] text-center">{{ item.quantidade }}</span>
                  <button @click="addToCart(item)" class="px-3 py-1 text-gray-500 hover:text-invictus-orange hover:bg-gray-100 font-bold transition">+</button>
                </div>
                
                <span class="font-black text-invictus-orange text-lg">R$ {{ (item.preco * item.quantidade).toFixed(2).replace('.', ',') }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div v-if="cart.length > 0" class="border-t border-gray-200 bg-gray-50 flex flex-col">
        
        <div class="p-6 border-b border-gray-200">
          <div v-if="!currentCoupon" class="flex gap-2">
            <input v-model="cupomInput" type="text" placeholder="CUPOM DE DESCONTO" class="flex-1 border-2 border-gray-200 p-3 text-xs font-bold uppercase tracking-widest focus:border-invictus-orange outline-none" />
            <button @click="handleApplyCoupon" class="bg-invictus-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-invictus-orange transition">Aplicar</button>
          </div>
          <div v-else class="flex justify-between items-center bg-green-50 text-green-700 p-4 border border-green-200 text-xs font-bold uppercase tracking-wider rounded-sm">
            <span class="flex items-center gap-2">✓ Cupom {{ currentCoupon }} ativo!</span>
            <button @click="removeCoupon" class="text-red-500 hover:underline">Remover</button>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-center mb-3 text-gray-500 text-sm">
            <span class="font-bold uppercase tracking-wider">Subtotal</span>
            <span class="font-bold">R$ {{ cartTotal.toFixed(2).replace('.', ',') }}</span>
          </div>
          
          <div v-if="discountAmount > 0" class="flex justify-between items-center mb-3 text-green-600 text-sm">
            <span class="font-bold uppercase tracking-wider">Desconto</span>
            <span class="font-bold">- R$ {{ discountAmount.toFixed(2).replace('.', ',') }}</span>
          </div>
          
          <div class="flex justify-between items-center mb-6 mt-4 pt-4 border-t border-gray-200">
            <span class="font-black text-invictus-black uppercase tracking-widest text-lg">Total</span>
            <span class="text-3xl font-black text-invictus-orange">R$ {{ finalTotal.toFixed(2).replace('.', ',') }}</span>
          </div>
          
          <button class="w-full bg-invictus-orange text-white py-5 font-black text-sm uppercase tracking-widest hover:bg-invictus-black transition duration-300 shadow-lg">
            Finalizar Compra
          </button>
        </div>
      </div>

    </div>

  </div>
</template>