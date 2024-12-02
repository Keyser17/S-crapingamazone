import * as fs from 'fs';
import * as cheerio from 'cheerio';

// Chemin vers le fichier HTML
const filePath = './lib/scraper/output.html';

/**
 * Fonction pour extraire les points forts de l'établissement
 */
async function extractFacilities() {
  try {
    // Lire le fichier HTML
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // Initialiser un tableau pour stocker les points forts
    const facilities: string[] = [];

    // Sélectionner les éléments correspondant aux points forts
    $('div.dc6c58be0b span.a5a5a75131').each((_, element) => {
      const facility = $(element).text().trim();
      if (facilities) {
        facilities.push(facility);
      }
    });

    // Vérifier si des points forts ont été trouvés
    if (facilities.length === 0) {
      console.log('Aucun point fort trouvé.');
    } else {
      console.log('Points forts extraits :', facilities);
    }

    // Sauvegarder les points forts dans un fichier JSON
    const outputPath = './lib/scraper/Booking/Ses_Points-Fort/extracted_facilities.json';
    fs.writeFileSync(outputPath, JSON.stringify({ facilities }, null, 2), 'utf-8');
    console.log(`Données sauvegardées dans ${outputPath}`);
  } catch (error) {
    console.error('Erreur lors de l’extraction des points forts :', error);
  }
}

// Exécuter la fonction
extractFacilities();
