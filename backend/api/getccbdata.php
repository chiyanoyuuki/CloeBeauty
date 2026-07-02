<?php
/**
 * Renvoie la dernière version des données du site (lue dans `ccb_data`).
 *
 * NB : ce fichier existe probablement déjà sur le serveur. Il est fourni ici
 * comme référence pour que lecture et écriture restent cohérentes.
 */
$cfg = __DIR__ . '/configsite.php';
if (!file_exists($cfg)) { $cfg = __DIR__ . '/config.php'; }
require $cfg;
ccb_cors();
header('Content-Type: application/json; charset=utf-8');

try {
  $bdd = ccb_db();
  $row = $bdd
    ->query('SELECT json_data FROM ccb_data ORDER BY id DESC LIMIT 1')
    ->fetch(PDO::FETCH_ASSOC);

  if (!$row) {
    echo '{}';
    exit;
  }
  // json_data est déjà une chaîne JSON : on la renvoie telle quelle.
  echo $row['json_data'];
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
