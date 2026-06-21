<?php
/**
 * Configuration de l'API du site Cloe Chaudron Beauty.
 *
 * À déposer sur le serveur dans /backend/api/configsite.php
 * (nom choisi pour ne pas écraser un éventuel config.php déjà présent).
 */

// --- Base de données ---------------------------------------------------
const CCB_DB_DSN  = 'mysql:host=localhost:3306;dbname=chcl8760_ccb;charset=utf8mb4';
const CCB_DB_USER = 'chcl8760_swisskey';
const CCB_DB_PASS = 'ssksolutions';

/**
 * 🔑 MOT DE PASSE DU MODE ADMIN — vérifié UNIQUEMENT ici, côté serveur.
 *    Il n'apparaît jamais dans le code du site (le front l'envoie pour
 *    vérification, mais ne le contient pas).
 *
 *  ➜ Changez cette valeur. C'est le seul endroit à modifier.
 *
 *  (Si laissé vide '', toute protection est désactivée : la connexion et les
 *   enregistrements sont acceptés sans mot de passe — déconseillé.)
 */
const CCB_ADMIN_PASSWORD = 'cloe2024';

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
