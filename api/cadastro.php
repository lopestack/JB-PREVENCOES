<?php
include('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = mysqli_real_escape_string($conn, $_POST['nome']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    // Criptografando a senha
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senha')";

    if (mysqli_query($conn, $sql)) {
        echo "Usuário cadastrado com sucesso! <a href='login.php'>Fazer Login</a>";
    } else {
        echo "Erro: " . mysqli_error($conn);
    }
}
?>

<!-- Formulário HTML Simples -->
<form method="POST">
    <input type="text" name="nome" placeholder="Nome Completo" required><br>
    <input type="email" name="email" placeholder="Seu E-mail" required><br>
    <input type="password" name="senha" placeholder="Crie uma Senha" required><br>
    <button type="submit">Cadastrar</button>
</form>