import { useState } from '#app';
import { computed } from 'vue';

export const useCart = () => {
  // Estados do carrinho
  const cart = useState('cart', () => []);
  const isCartOpen = useState('isCartOpen', () => false);
  
  // Estados do Cupom
  const currentCoupon = useState('currentCoupon', () => null);

  // =====================================
  // GERENCIAMENTO DE PRODUTOS
  // =====================================
  const addToCart = (produto) => {
    const itemExistente = cart.value.find(item => item.id === produto.id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      cart.value.push({ ...produto, quantidade: 1 });
    }
    isCartOpen.value = true;
  };

  const decreaseQuantity = (produtoId) => {
    const item = cart.value.find(item => item.id === produtoId);
    if (item) {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        removeFromCart(produtoId); // Se chegar a 0, remove o item
      }
    }
  };

  const removeFromCart = (produtoId) => {
    cart.value = cart.value.filter(item => item.id !== produtoId);
    // Se o carrinho esvaziar, tira o cupom
    if (cart.value.length === 0) removeCoupon();
  };

  // =====================================
  // LÓGICA DE CUPONS DE DESCONTO
  // =====================================
  const applyCoupon = (code) => {
    const codigoFormatado = code.trim().toUpperCase();
    
    // Você pode cadastrar seus cupons aqui!
    if (codigoFormatado === 'JB10') { // 10% de desconto
      currentCoupon.value = 'JB10';
      return { success: true, message: 'Cupom de 10% aplicado com sucesso!' };
    } 
    else if (codigoFormatado === 'BRABO50') { // R$ 50 de desconto fixo
      currentCoupon.value = 'BRABO50';
      return { success: true, message: 'Desconto de R$ 50 aplicado!' };
    } 
    else {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }
  };

  const removeCoupon = () => {
    currentCoupon.value = null;
  };

  // =====================================
  // MATEMÁTICA E CÁLCULOS
  // =====================================
  const cartCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantidade, 0);
  });

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  });

  // Calcula quanto dinheiro está sendo descontado
  const discountAmount = computed(() => {
    if (!currentCoupon.value) return 0;
    if (currentCoupon.value === 'JB10') return cartTotal.value * 0.10;
    if (currentCoupon.value === 'BRABO50') return 50;
    return 0;
  });

  // Calcula o total a pagar (Subtotal - Desconto)
  const finalTotal = computed(() => {
    return Math.max(0, cartTotal.value - discountAmount.value); // Math.max evita dar valor negativo
  });

  return { 
    cart, 
    isCartOpen, 
    addToCart, 
    decreaseQuantity, 
    removeFromCart, 
    cartCount,
    cartTotal,
    currentCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal
  };
};