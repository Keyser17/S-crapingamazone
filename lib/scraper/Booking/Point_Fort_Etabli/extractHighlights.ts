import * as fs from "fs";
import * as cheerio from "cheerio";

// Chemin vers le fichier HTML
const filePath = "./lib/scraper/output.html";

async function extractHighlights() {
  try {
    // Lire le fichier HTML
    const html = fs.readFileSync(filePath, "utf-8");
    const $ = cheerio.load(html);

    // Extraire les points forts de l'établissement
    const highlights = $(
      'div.property-highlights h3:contains("Points forts de l\'établissement")',
    )
      .next(".ph-section")
      .find("span.ph-item-copy-heart")
      .text()
      .trim();

    // Extraire les informations sur le petit-déjeuner
    const breakfastInfo = $(
      'div.ph-section h4:contains("Infos concernant le petit-déjeuner")',
    )
      .parent()
      .next(".ph-content")
      .find("span.ph-item-copy-breakfast-option")
      .text()
      .trim();

    // Extraire les informations sur le parking
    const parkingInfo = $("div.ph-section span.ph-item-copy-parking")
      .text()
      .trim();

    // Construire l'objet final
    const extractedData = {
      highlights,
      breakfastInfo,
      parkingInfo,
    };

    // Afficher les données extraites
    console.log("Données extraites :", extractedData);

    // Sauvegarder les données dans un fichier JSON
    fs.writeFileSync(
      "./lib/scraper/Booking/Point_Fort_Etabli/extracted_highlights.json",
      JSON.stringify(extractedData, null, 2),
      "utf-8",
    );
    console.log("Données sauvegardées dans extracted_highlights.json");
  } catch (error) {
    console.error("Erreur lors de l’extraction des données :", error);
  }
}

// Exécuter la fonction
extractHighlights();
