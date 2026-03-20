<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('conexao.php');

$json = file_get_contents('php://input');
$dados = json_decode($json, true);

if ($dados) {
    $email = mysqli_real_escape_string($conn, $dados['email']);
    $senha = mysqli_real_escape_string($conn, $dados['senha']);

    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $usuario = mysqli_fetch_assoc($result);
        
        // Retornamos 'nivel' para o Nuxt ler
        // No final do login.php, dentro do if(mysqli_num_rows > 0)
        echo json_encode([
            "success" => true,
            "nome" => $usuario['nome'],
            "nivel" => $usuario['nivel'] // Aqui vai vir 0 ou 1 do banco
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuário ou senha inválidos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Dados não recebidos"]);
}
?>