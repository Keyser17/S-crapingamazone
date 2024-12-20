import * as fs from "fs";
import * as cheerio from "cheerio";

// Chemin vers le fichier HTML
const filePath = "./lib/scraper/output.html";

/**
 * Fonction pour extraire les catégories et leurs scores
 */
async function extractCategoriesAndScores() {
  try {
    // Lire le fichier HTML
    const html = fs.readFileSync(filePath, "utf-8");
    const $ = cheerio.load(html);

    // Initialiser un tableau pour stocker les catégories et leurs scores
    const categories: { category: string; score: string }[] = [];

    // Sélectionner les catégories et leurs scores
    $('div[data-testid="review-subscore"]').each((_, element) => {
      const category = $(element).find("span.be887614c2").text().trim(); // Nom de la catégorie
      const score = $(element).find("div.bdc1ea4a28").text().trim(); // Score associé

      if (category && score) {
        categories.push({ category, score });
      }
    });

    // Vérifier si des catégories ont été trouvées
    if (categories.length === 0) {
      console.log("Aucune catégorie trouvée.");
    } else {
      console.log("Catégories extraites :", categories);
    }

    // Sauvegarder les catégories dans un fichier JSON
    const outputPath =
      "./lib/scraper/Booking/Categories_And_Scores/categories.json";
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ categories }, null, 2),
      "utf-8",
    );
    console.log(`Données sauvegardées dans ${outputPath}`);
  } catch (error) {
    console.error("Erreur lors de l’extraction des catégories :", error);
  }
}

// Exécuter la fonction
extractCategoriesAndScores();
