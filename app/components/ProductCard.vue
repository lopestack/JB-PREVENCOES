<template>
  <div class="group cursor-pointer">
    <div class="relative bg-invictus-gray aspect-square mb-4 flex items-center justify-center overflow-hidden">
      <img v-if="image" :src="image" :alt="name" class="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition duration-500" />
      
      <span class="absolute top-2 left-2 bg-invictus-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
        {{ category }}
      </span>
    </div>
    
    <div class="text-center px-2">
      <h3 class="text-[14px] font-bold text-gray-800 uppercase leading-tight mb-2 group-hover:text-invictus-orange transition">{{ name }}</h3>
      
      <div class="flex justify-center text-invictus-orange text-[10px] mb-2">
        ★★★★★ <span class="text-gray-400 ml-1">(12 avaliações)</span>
      </div>

      <div class="text-lg font-black text-invictus-black">
        R$ {{ price.toFixed(2).replace('.', ',') }}
      </div>
      <div class="text-[11px] text-gray-500 font-bold mt-1">
        ou 10x de R$ {{ (price / 10).toFixed(2).replace('.', ',') }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'Geral' },
  image: { type: String, default: '' }
})
</script>