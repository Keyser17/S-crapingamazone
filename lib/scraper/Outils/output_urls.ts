import * as readline from "readline";
import axios from "axios";
import * as fs from "fs";

// Fonction pour poser une question à l'utilisateur
function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Fonction principale pour extraire le HTML brut
async function extractHtml() {
  try {
    // Demander à l'utilisateur de fournir un nom pour le fichier et l'URL
    const fileName: string = await askQuestion(
      "Entrez le nom du fichier de sortie (sans extension) : ",
    );
    const url: string = await askQuestion("Entrez l'URL à scraper : ");

    console.log(`Téléchargement du HTML depuis l'URL : ${url}`);

    // Récupérer le contenu HTML de l'URL
    const response = await axios.get(url);

    // Sauvegarder le HTML brut dans un fichier
    const filePath = `./${fileName}.html`;
    fs.writeFileSync(filePath, response.data, "utf-8");

    console.log(`HTML extrait et sauvegardé dans ${filePath}`);
  } catch (error) {
    console.error("Erreur lors de l’extraction du HTML :", error);
  }
}

// Exécuter la fonction
extractHtml();
