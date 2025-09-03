<?php
// Cambiá estos datos según tu hosting de MySQL
$host = "localhost";      // normalmente localhost en hosting compartido
$dbname = "noticias_db";  // nombre de tu base de datos
$user = "tu_usuario";     // usuario de la base de datos
$pass = "tu_clave";       // contraseña de la base de datos

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la conexión: " . $e->getMessage()]);
    exit;
}
?>
