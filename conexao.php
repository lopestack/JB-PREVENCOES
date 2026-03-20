<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "loja_jb"; // Substitua pelo nome real do seu banco

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}
?>