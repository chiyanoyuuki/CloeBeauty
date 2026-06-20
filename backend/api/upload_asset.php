<?php
/**
 * Téléverse une image (ou vidéo) dans le dossier des assets du site
 * et renvoie le nom du fichier enregistré.
 *
 * Le mode admin appelle ce script quand on clique sur "Changer" une image.
 *
 * Paramètres (multipart/form-data) :
 *   - file      : le fichier
 *   - folder    : '' | portfolio | topportfolio | domains | weddings | photographers | decos
 *   - filename  : (optionnel) force le nom du fichier — utilisé pour écraser
 *                 les images numérotées des partenaires (ex: 0.jpg)
 *   - password  : mot de passe admin (vérifié si activé dans config.php)
 *
 * Réponse JSON : { "status": "ok", "filename": "...", "folder": "..." }
 */
require __DIR__ . '/configsite.php';
ccb_cors();
header('Content-Type: application/json');

ccb_check_password($_POST['password'] ?? null);

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Aucun fichier reçu']);
  exit;
}

// Dossier des assets : /backend/assets, relatif à /backend/api/
$assetsDir = realpath(__DIR__ . '/../assets');
if ($assetsDir === false) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Dossier assets introuvable']);
  exit;
}

// Sous-dossier autorisé uniquement (évite toute traversée de répertoire).
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

$ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'mp4', 'webm'];
if (!in_array($ext, $allowedExt, true)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Type de fichier non autorisé']);
  exit;
}

if (!empty($_POST['filename'])) {
  // Écrasement contrôlé (basename empêche tout chemin).
  $filename = basename((string) $_POST['filename']);
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
