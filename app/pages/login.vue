<script setup>
import { ref } from 'vue';

const email = ref('');
const senha = ref('');

const fazerLogin = async () => {
  try {
    const response = await fetch('http://localhost/Loja/loja-tatica/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: email.value, 
        senha: senha.value 
      })
    });

    const dados = await response.json();
    console.log("Resposta do Servidor:", dados);

    if (dados.success) {
      localStorage.setItem('user_nivel', dados.nivel);
      localStorage.setItem('user_nome', dados.nome);
      
      // Convertemos para String ou comparamos como número
      if (String(dados.nivel) === '1') { 
        window.location.href = '/admin'; 
      } else {
        window.location.href = '/'; 
      }
    } else {
      alert(dados.message);
    }
  } catch (error) {
    console.error("Erro na conexão:", error);
    alert("Erro ao conectar com o servidor.");
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-lg w-96 border-t-4 border-orange-600">
      <h2 class="text-2xl font-black mb-6 text-center text-slate-900">JB PREVENÇÕES</h2>
      
      <div class="space-y-4">
        <input v-model="email" type="email" placeholder="E-mail" class="w-full border p-3 rounded shadow-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        <input v-model="senha" type="password" placeholder="Senha" class="w-full border p-3 rounded shadow-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        
        <button @click="fazerLogin" class="bg-orange-600 text-white w-full py-3 font-bold uppercase hover:bg-orange-700 transition duration-300 shadow-md">
          Acessar Sistema
        </button>
      </div>
    </div>
  </div>
</template>