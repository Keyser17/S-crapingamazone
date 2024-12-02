import * as fs from 'fs';
import * as cheerio from 'cheerio';

// Fichier HTML source
const filePath = './lib/scraper/output.html';

/**
 * Fonction principale pour extraire toutes les données pertinentes
 */
async function extractAllHotelData(): Promise<void> {
  try {
    // Lire le contenu du fichier HTML
    const html = fs.readFileSync(filePath, 'utf-8');

    // Charger le contenu HTML avec Cheerio
    const $ = cheerio.load(html);

    // 1. Extraire les données JSON (script application/ld+json)
    const scriptContent = $('script[type="application/ld+json"]').html();
    let hotelData = {};
    if (scriptContent) {
      try {
        hotelData = JSON.parse(scriptContent);
        console.log('Données JSON extraites :', hotelData);
      } catch (error) {
        console.error('Erreur lors du parsing JSON :', error.message);
      }
    }

    // 2. Extraire les autres informations depuis le DOM
    const name = hotelData['name'] || $('h1.hotel-name-selector').text().trim();
    const address = hotelData['address']?.streetAddress || $('address.hotel-address').text().trim();
    const locality = hotelData['address']?.addressLocality || $('span.locality').text().trim();
    const price = $('span.price-amount').text().trim() || 'Prix non disponible';
    const reviews = $('span.review-score').text().trim() || 'Avis non disponible';

    // 3. Créer un objet final avec toutes les données
    const extractedData = {
      name,
      address,
      locality,
      price,
      reviews,
      url: hotelData['url'] || 'URL non disponible',
    };

    // 4. Afficher les données extraites
    console.log('Données extraites :', extractedData);

    // 5. Sauvegarder les données dans un fichier JSON
    fs.writeFileSync('./extracted_data.json', JSON.stringify(extractedData, null, 2), 'utf-8');
    console.log('Données sauvegardées dans extracted_data.json');
  } catch (error) {
    console.error('Erreur lors de l’extraction des données :', error.message);
  }
}

// Exécuter la fonction
extractAllHotelData();
