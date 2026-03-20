<?php
// Desativa a exibição de erros HTML para não quebrar o JSON do Vue
ini_set('display_errors', 0); 
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include('conexao.php');

$metodo = $_SERVER['REQUEST_METHOD'];

try {
    if ($metodo == 'GET') {
        $sql = "SELECT * FROM produtos ORDER BY id DESC";
        $result = mysqli_query($conn, $sql);
        if (!$result) throw new Exception(mysqli_error($conn));
        
        $produtos = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($produtos);
        exit;
    }

    if ($metodo == 'POST') {
        $json = file_get_contents('php://input');
        $d = json_decode($json, true);

        if (!$d) throw new Exception("Dados JSON inválidos");

        $nome      = mysqli_real_escape_string($conn, $d['nome']);
        $cat       = mysqli_real_escape_string($conn, $d['categoria']);
        $preco     = $d['preco'] ? $d['preco'] : 0;
        $estoque   = $d['estoque'] ? $d['estoque'] : 0;
        $desc      = mysqli_real_escape_string($conn, $d['descricao']);
        $img       = mysqli_real_escape_string($conn, $d['imagem_url']);

        $sql = "INSERT INTO produtos (nome, categoria, preco, estoque, descricao, imagem_url) 
                VALUES ('$nome', '$cat', '$preco', '$estoque', '$desc', '$img')";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(["success" => true]);
        } else {
            throw new Exception(mysqli_error($conn));
        }
        exit;
    }
} catch (Exception $e) {
    // Se der qualquer erro, ele envia como JSON em vez de HTML
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
    exit;
}