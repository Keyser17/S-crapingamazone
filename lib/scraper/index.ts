import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeBookingDetails(url : string) {
  if (!url) return;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extraction du nom de l'établissement
    const name = $('div[data-testid="title"]').text().trim();

    // Extraction de la localisation
    const address = $('span[data-testid="address"]').text().trim();
    const distanceFromCenter = $('span[data-testid="distance"]').text().trim();

    // Extraction des avis
    const ratingScore = $('div[data-testid="review-score"]').text().trim();
    const reviewsCount = $('div.abf093bdfe.f45d8e4c32.d935416c47').text().trim();

    // Extraction des prix
    const currentPrice = $('span[data-testid="price"]').text().trim();
    const originalPrice = $('span[data-testid="original-price"]').text().trim();

    // Disponibilité
    const availabilityText = $('div:contains("Plus qu")').text().trim();
    const isAvailable = !availabilityText.includes('Plus qu');

    // Extraction des images
    const images = [];
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        images.push(src);
      }
    });

    // Construction de l'objet de données
    const data = {
      name,
      location: {
        address,
        distanceFromCenter,
      },
      rating: {
        score: ratingScore,
        reviewsCount,
      },
      price: {
        current: currentPrice,
        original: originalPrice,
      },
      availability: {
        isAvailable,
        message: availabilityText,
      },
      images,
    };

    return data;
  } catch (error) {
    console.error('Failed to scrape Booking details:', Error);
    throw error;
  }
}
