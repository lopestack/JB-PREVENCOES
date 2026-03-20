<?php
session_start();

// Verifica se está logado E se é admin
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] != 'admin') {
    // Se não for admin, chuta ele de volta para o login ou para a loja
    header("Location: ../login.php");
    exit();
}

echo "Bem-vindo ao Painel de Controle, " . $_SESSION['usuario_nome'];
?>
<!-- Conteúdo do Dashboard aqui -->