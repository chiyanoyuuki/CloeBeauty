<?php
/**
 * EXEMPLE de configuration de l'API.
 *
 * ➜ Sur le serveur, copier ce fichier en  configsite.php  et y renseigner les
 *   vraies valeurs. Le vrai configsite.php est ignoré par git (aucun identifiant
 *   réel n'est versionné).
 */

// --- Base de données ---------------------------------------------------
const CCB_DB_DSN  = 'mysql:host=localhost:3306;dbname=VOTRE_BASE;charset=utf8mb4';
const CCB_DB_USER = 'VOTRE_UTILISATEUR_BDD';
const CCB_DB_PASS = 'VOTRE_MOT_DE_PASSE_BDD';

/**
 * 🔑 MOT DE PASSE DU MODE ADMIN — vérifié UNIQUEMENT ici, côté serveur.
 *    (Si laissé vide '', toute protection est désactivée — déconseillé.)
 */
const CCB_ADMIN_PASSWORD = 'CHANGEZ_MOI';

// ----------------------------------------------------------------------

function ccb_db(): PDO {
  return new PDO(CCB_DB_DSN, CCB_DB_USER, CCB_DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);
}

function ccb_cors(): void {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit;
  }
}

/** Vrai si le mot de passe fourni est valide (ou si la protection est désactivée). */
function ccb_password_ok(?string $provided): bool {
  if (CCB_ADMIN_PASSWORD === '') {
    return true; // protection désactivée
  }
  return hash_equals(CCB_ADMIN_PASSWORD, (string) $provided);
}

/** Refuse la requête (403) si le mot de passe est invalide. */
function ccb_check_password(?string $provided): void {
  if (!ccb_password_ok($provided)) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Mot de passe invalide']);
    exit;
  }
}
