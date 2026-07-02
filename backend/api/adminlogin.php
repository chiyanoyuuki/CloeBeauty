<?php
/**
 * Vérifie le mot de passe du mode admin (saisi par l'utilisateur).
 * Le mot de passe lui-même n'existe QUE côté serveur (configsite.php).
 *
 * Réponse : { "status": "ok" } si valide, sinon HTTP 403.
 */
$cfg = __DIR__ . '/configsite.php';
if (!file_exists($cfg)) { $cfg = __DIR__ . '/config.php'; }
require $cfg;
ccb_cors();
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '[]', true);
$password = is_array($body) ? ($body['password'] ?? null) : null;

if (ccb_password_ok($password)) {
  echo json_encode(['status' => 'ok']);
} else {
  http_response_code(403);
  echo json_encode(['status' => 'error', 'message' => 'Mot de passe incorrect']);
}
