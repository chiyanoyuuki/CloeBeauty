<?php
/**
 * Enregistre l'intégralité des données du site dans la table `ccb_data`
 * (une nouvelle ligne = une version, ce qui garde l'historique).
 *
 * Appelé par le bouton "Enregistrer" du mode admin.
 */
require __DIR__ . '/configsite.php';
ccb_cors();
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Corps de requête vide']);
  exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'JSON invalide']);
  exit;
}

// Vérification du mot de passe (si activé dans config.php), puis on ne le stocke pas.
ccb_check_password($data['password'] ?? null);
unset($data['password']);

$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

try {
  $bdd = ccb_db();
  $stmt = $bdd->prepare('INSERT INTO ccb_data (json_data) VALUES (:data)');
  $stmt->execute(['data' => $json]);
  echo json_encode(['status' => 'ok']);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
