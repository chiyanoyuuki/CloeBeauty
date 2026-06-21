const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// Identifiants FTP : chargés depuis deploy.config.json (ignoré par git) ou
// depuis les variables d'environnement. Voir deploy.config.example.json.
let ftpConfig = {};
try {
  ftpConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "deploy.config.json"), "utf8")
  );
} catch {
  // Pas de fichier local : on se rabat sur les variables d'environnement.
}

const FTP_HOST = process.env.FTP_HOST || ftpConfig.host;
const FTP_USER = process.env.FTP_USER || ftpConfig.user;
const FTP_PASSWORD = process.env.FTP_PASSWORD || ftpConfig.password;
const FTP_REMOTE_PATH =
  process.env.FTP_REMOTE_PATH || ftpConfig.remotePath || "/public_html";

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error(
    "❌ Identifiants FTP manquants.\n" +
      "   Copiez deploy.config.example.json en deploy.config.json et renseignez\n" +
      "   vos identifiants (ou définissez FTP_HOST / FTP_USER / FTP_PASSWORD)."
  );
  process.exit(1);
}
const LOCAL_PATH = path.join(__dirname, "docs");
const BROWSER_PATH = path.join(LOCAL_PATH, "browser");
const EXCLUDED_FILES = [path.normalize("public/data.json")];

function isExcluded(localPath) {
  const relative = path.relative(LOCAL_PATH, localPath);
  return EXCLUDED_FILES.includes(path.normalize(relative));
}

// Déplace tout le contenu de browser vers docs
function moveBrowserContent() {
  if (!fs.existsSync(BROWSER_PATH)) return;
  const files = fs.readdirSync(BROWSER_PATH);
  for (const file of files) {
    const src = path.join(BROWSER_PATH, file);
    const dest = path.join(LOCAL_PATH, file);
    fs.renameSync(src, dest);
  }
  fs.rmdirSync(BROWSER_PATH);
}

function gitCommitPush() {
  try {
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "deploy"', { stdio: "inherit" });
    execSync("git push", { stdio: "inherit" });
  } catch (err) {
    console.log("Git commit/push ignoré (peut-être pas de changements).");
  }
}

async function removeExceptBackend(client, dir) {
  const list = await client.list(dir);
  for (const item of list) {
    if (item.name === "backend") continue;
    if (item.name === "adminccb") continue;
    if (item.name === "intraccb") continue;
    const remotePath = `${dir}/${item.name}`;
    if (item.isDirectory) {
      await client.removeDir(remotePath);
    } else {
      await client.remove(remotePath);
    }
  }
}

async function uploadDir(client, localDir, remoteDir) {
  const files = fs.readdirSync(localDir);
  for (const file of files) {
    const localPath = path.join(localDir, file);
    if (isExcluded(localPath)) {
      console.log("Fichier ignoré :", localPath);
      continue;
    }

    const remotePath = `${remoteDir}/${file}`;
    if (fs.lstatSync(localPath).isDirectory()) {
      await client.ensureDir(remotePath);
      await uploadDir(client, localPath, remotePath);
    } else {
      await client.uploadFrom(localPath, remotePath);
    }
  }
}

async function deploy() {
  console.log("Build Angular...");
  execSync(
    "ng build --configuration=production --output-path docs --base-href ./",
    { stdio: "inherit" }
  );

  console.log("Déplacement du contenu de browser vers docs...");
  moveBrowserContent();

  console.log("Commit + push Git...");
  gitCommitPush();

  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    console.log("Connexion FTP...");
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      secure: false,
    });

    console.log("Suppression des fichiers sauf backend...");
    await removeExceptBackend(client, FTP_REMOTE_PATH);

    console.log("Upload des fichiers docs...");
    await uploadDir(client, LOCAL_PATH, FTP_REMOTE_PATH);

    console.log("Déploiement terminé.");
  } catch (err) {
    console.error(err);
  }
  client.close();
}

deploy();
