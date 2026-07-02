<?php
/**
 * Téléverse une image (ou vidéo) dans /backend/assets et renvoie le nom du
 * fichier enregistré. Appelé par le mode admin (bouton « Changer »).
 *
 * Paramètres (multipart/form-data) :
 *   - file      : le fichier
 *   - folder    : '' | portfolio | topportfolio | domains | weddings | photographers | decos
 *   - filename  : (optionnel) force le nom du fichier (images numérotées)
 *   - password  : mot de passe admin (vérifié si activé dans la config)
 *
 * Réponse JSON : { "status": "ok", "filename": "...", "folder": "..." }
 */

// --- En-têtes CORS AVANT TOUT (même en cas d'erreur ultérieure) ----------
// Ainsi le navigateur reçoit toujours les en-têtes CORS et affiche le vrai
// message d'erreur au lieu d'une « erreur CORS » trompeuse.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(200);
  exit;
}
header('Content-Type: application/json');

// --- Envoi trop volumineux ? (post_max_size dépassé -> $_POST/$_FILES vides) ---
if (
  ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' &&
  empty($_POST) && empty($_FILES) &&
  (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0
) {
  http_response_code(413);
  echo json_encode([
    'status' => 'error',
    'message' => 'Fichier trop volumineux (limite serveur post_max_size). Voir .user.ini.',
  ]);
  exit;
}

// --- Configuration (le nom du fichier varie selon l'installation) --------
$cfg = __DIR__ . '/configsite.php';
if (!file_exists($cfg)) {
  $cfg = __DIR__ . '/config.php';
}
require $cfg;

ccb_check_password($_POST['password'] ?? null);

// --- Fichier reçu ? ------------------------------------------------------
if (!isset($_FILES['file'])) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Aucun fichier reçu']);
  exit;
}
$err = $_FILES['file']['error'];
if ($err !== UPLOAD_ERR_OK) {
  $map = [
    UPLOAD_ERR_INI_SIZE => 'Fichier trop volumineux (upload_max_filesize). Voir .user.ini.',
    UPLOAD_ERR_FORM_SIZE => 'Fichier trop volumineux.',
    UPLOAD_ERR_PARTIAL => 'Upload interrompu, réessayez.',
    UPLOAD_ERR_NO_FILE => 'Aucun fichier reçu.',
    UPLOAD_ERR_NO_TMP_DIR => 'Dossier temporaire manquant sur le serveur.',
    UPLOAD_ERR_CANT_WRITE => 'Écriture disque impossible sur le serveur.',
  ];
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => $map[$err] ?? ('Erreur upload #' . $err)]);
  exit;
}

// --- Dossier cible -------------------------------------------------------
$assetsDir = realpath(__DIR__ . '/../assets');
if ($assetsDir === false) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Dossier assets introuvable']);
  exit;
}

$folder = isset($_POST['folder']) ? trim((string) $_POST['folder'], "/\\ ") : '';
$allowedFolders = ['', 'portfolio', 'topportfolio', 'domains', 'weddings', 'photographers', 'decos'];
if (!in_array($folder, $allowedFolders, true)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Dossier non autorisé']);
  exit;
}

$targetDir = $assetsDir . ($folder !== '' ? '/' . $folder : '');
if (!is_dir($targetDir) && !mkdir($targetDir, 0775, true)) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Impossible de créer le dossier']);
  exit;
}

// --- Type autorisé -------------------------------------------------------
$ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'heic', 'heif', 'mp4', 'webm'];
if (!in_array($ext, $allowedExt, true)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Type de fichier non autorisé']);
  exit;
}

// --- Nom du fichier ------------------------------------------------------
if (!empty($_POST['filename'])) {
  $filename = basename((string) $_POST['filename']); // écrasement contrôlé
} else {
  $filename = 'img_' . bin2hex(random_bytes(6)) . '.' . $ext;
}

$dest = $targetDir . '/' . $filename;
if (!move_uploaded_file($_FILES['file']['tmp_name'], $dest)) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Enregistrement du fichier impossible']);
  exit;
}
@chmod($dest, 0644);

echo json_encode(['status' => 'ok', 'filename' => $filename, 'folder' => $folder]);
