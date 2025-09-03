<?php
require 'db.php';

$stmt = $pdo->query("SELECT id_noticia, titulo, subtitulo, fecha_publicacion FROM noticias WHERE estado='publicada' ORDER BY fecha_publicacion DESC");
$noticias = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($noticias);
?>
