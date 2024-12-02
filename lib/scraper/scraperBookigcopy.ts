import * as fs from 'fs';
import * as cheerio from 'cheerio';

const filePath = './lib/scraper/output.html';

async function extractAllHotelData(): Promise<void> {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);

    // Extraire les données JSON
    const scriptContent = $('script[type="application/ld+json"]').html();
    let hotelData: any = {};
    if (scriptContent) {
      try {
        hotelData = JSON.parse(scriptContent);
      } catch (error) {
        console.error('Erreur lors du parsing JSON :', error);
      }
    }

    // Informations principales
    const name = hotelData.name || $('h1.hotel-name-selector').text().trim();
    const address = hotelData.address?.streetAddress || $('address.hotel-address').text().trim();
    const locality = hotelData.address?.addressLocality || $('span.locality').text().trim();
    const price = $('span.price-amount').text().trim() || 'Prix non disponible';
    const reviews = $('span.review-score').text().trim() || 'Avis non disponible';

    // Extraire la description complète
    const jsonDescription = hotelData.description || '';
    const additionalDescription = $('p[data-testid="property-description"]')
      .map((_, element) => $(element).text().trim())
      .get()
      .join(' ');

    // Fusionner les descriptions
    const description = `${jsonDescription} ${additionalDescription}`.trim();

    // Objet final
    const extractedData = {
      name,
      address,
      locality,
      price,
      reviews,
      description,
      url: hotelData.url || 'URL non disponible',
    };

    // Afficher et sauvegarder les données
    console.log('Données extraites :', extractedData);
    fs.writeFileSync('./extracted_data.json', JSON.stringify(extractedData, null, 2), 'utf-8');
    console.log('Données sauvegardées dans extracted_data.json');
  } catch (error) {
    console.error('Erreur lors de l’extraction des données :', error.message);
  }
}

// Exécuter la fonction
extractAllHotelData();
