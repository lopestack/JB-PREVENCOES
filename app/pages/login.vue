<script setup>
import { ref, onMounted } from 'vue';

const isLogin = ref(true); 
const nome = ref('');
const email = ref('');
const senha = ref('');

const mostrarSenha = ref(false);
const lembrarMe = ref(false);

onMounted(() => {
  const emailSalvo = localStorage.getItem('lembrar_email');
  if (emailSalvo) {
    email.value = emailSalvo;
    lembrarMe.value = true;
  }
});

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  senha.value = ''; 
};

const submitForm = async () => {
  if (isLogin.value) {
    // ---- LOGIN ----
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, senha: senha.value })
      });
      const dados = await response.json();
      
      if (dados.success) {
        if (lembrarMe.value) {
          localStorage.setItem('lembrar_email', email.value);
        } else {
          localStorage.removeItem('lembrar_email');
        }

        localStorage.setItem('user_nivel', dados.nivel);
        localStorage.setItem('user_nome', dados.nome);
        window.location.href = String(dados.nivel) === '1' ? '/admin' : '/'; 
      } else {
        alert(dados.message || "Credenciais inválidas");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor de login.");
    }
  } else {
    // ---- CADASTRO ----
    try {
      const response = await fetch('http://localhost:3001/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.value, email: email.value, senha: senha.value })
      });
      
      // 1. Pega a resposta bruta do servidor como texto
      const textoPuro = await response.text();
      console.log("RESPOSTA BRUTA DO PHP:", textoPuro); // Mostra no F12

      try {
        // 2. Tenta converter para JSON
        const dados = JSON.parse(textoPuro);

        if (dados.success) {
          alert("Alistamento concluído com sucesso, Soldado! Faça seu login.");
          isLogin.value = true; 
        } else {
          alert(dados.message || "Erro ao tentar cadastrar.");
        }
      } catch (parseError) {
        // 3. Se não conseguir converter, mostra na tela qual foi o erro real do PHP!
        alert("O PHP falhou e retornou isso: \n\n" + textoPuro);
      }

    } catch (error) {
      alert("Erro de rede! O servidor Apache (XAMPP) está ligado?");
    }
  }
};
</script>

<template>
  <div class="flex h-screen w-full bg-white">
    
    <div class="hidden md:flex md:w-1/2 bg-invictus-black relative overflow-hidden items-center">
      <img src="https://via.placeholder.com/800x1000/111111/ff4c00?text=OPERAÇÃO+JB" class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
      <div class="relative z-10 px-16 text-white">
        <h1 class="text-6xl font-black uppercase tracking-tighter mb-4 leading-none">Bem-vindo<br>à Base.</h1>
        <p class="text-lg font-bold text-gray-400 tracking-widest max-w-sm">ACESSE SEU LOADOUT OU CADASTRE-SE PARA GARANTIR EQUIPAMENTOS EXCLUSIVOS.</p>
      </div>
    </div>

    <div class="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative">
      <div class="w-full max-w-sm">
        
        <div class="mb-12">
          <p @click="$router.push('/')" class="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer hover:text-invictus-orange transition flex items-center gap-2">
            <span>←</span> Voltar para a Loja
          </p>
        </div>

        <h3 class="text-3xl font-black text-invictus-black uppercase tracking-tighter mb-2">
          {{ isLogin ? 'Identifique-se' : 'Aliste-se' }}
        </h3>
        <p class="text-sm text-gray-500 font-bold mb-8 uppercase tracking-wider">
          {{ isLogin ? 'Insira suas credenciais abaixo.' : 'Preencha seus dados reais.' }}
        </p>
        
        <div class="space-y-4">
          <div v-if="!isLogin">
            <label class="block text-[10px] font-black text-invictus-black uppercase tracking-widest mb-1">Nome Completo</label>
            <input v-model="nome" type="text" class="w-full border-2 border-gray-200 rounded-none p-3 text-sm font-bold focus:outline-none focus:border-invictus-orange transition" placeholder="NOME DO OPERADOR" />
          </div>

          <div>
            <label class="block text-[10px] font-black text-invictus-black uppercase tracking-widest mb-1">E-mail</label>
            <input v-model="email" type="email" class="w-full border-2 border-gray-200 rounded-none p-3 text-sm font-bold focus:outline-none focus:border-invictus-orange transition" placeholder="SEU@EMAIL.COM" />
          </div>

          <div class="relative">
            <label class="block text-[10px] font-black text-invictus-black uppercase tracking-widest mb-1">Senha</label>
            <input v-model="senha" :type="mostrarSenha ? 'text' : 'password'" class="w-full border-2 border-gray-200 rounded-none p-3 pr-12 text-sm font-bold focus:outline-none focus:border-invictus-orange transition" placeholder="••••••••" />
            
            <button type="button" @click="mostrarSenha = !mostrarSenha" class="absolute right-4 top-[30px] text-gray-400 hover:text-invictus-orange transition">
              <svg v-if="!mostrarSenha" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>

          <div v-if="isLogin" class="flex items-center pt-2">
            <input v-model="lembrarMe" id="lembrar-checkbox" type="checkbox" class="w-4 h-4 text-invictus-orange bg-gray-100 border-gray-300 rounded focus:ring-invictus-orange focus:ring-2 accent-invictus-orange cursor-pointer">
            <label for="lembrar-checkbox" class="ml-2 text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer hover:text-invictus-black transition">
              Lembrar meu e-mail
            </label>
          </div>
          
          <button @click="submitForm" class="w-full bg-invictus-orange text-white py-4 font-black uppercase tracking-widest hover:bg-invictus-black transition duration-300 mt-4">
            {{ isLogin ? 'Entrar' : 'Cadastrar' }}
          </button>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-[11px] text-gray-500 font-black uppercase tracking-widest">
            {{ isLogin ? 'Não possui acesso?' : 'Já faz parte da tropa?' }}
            <span @click="toggleMode" class="text-invictus-black cursor-pointer hover:text-invictus-orange ml-1 border-b border-invictus-black hover:border-invictus-orange transition pb-0.5">
              {{ isLogin ? 'Crie sua conta' : 'Fazer Login' }}
            </span>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>