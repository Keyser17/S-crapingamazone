// "use server"

import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from '../utils';
import { scrapeImagesFromPage } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // Configuration du proxy BrightData
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    // Récupération de la page produit via axios
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extraction du titre du produit
    const title = $('#productTitle').text().trim();
    
    // Extraction des prix
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base')
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    // Vérification de la disponibilité
    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    // Extraction des images via Cheerio
    const images = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    // Si les images via Cheerio sont insuffisantes, essayons avec Puppeteer
    if (imageUrls.length === 0) {
      console.log("No images found with Cheerio, trying Puppeteer...");
      const imgSelector = '.plp-card-thumbnail img'; // Ajuster le sélecteur selon la page
      const puppeteerImages = await scrapeImagesFromPage(url, imgSelector);

      if (puppeteerImages.length > 0) {
        imageUrls.push(...puppeteerImages);
      }
    }

    // Extraction des autres informations
    const currency = extractCurrency($('.a-price-symbol'));
    let discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
    discountRate = Number(discountRate); // Convertir la chaîne en nombre
    // Si discountRate est NaN, définir une valeur par défaut (par exemple 0)
    if (isNaN(discountRate)) {
        discountRate = 0;
    }
    
    const description = extractDescription($);

    // Construction de l'objet des données
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls, // Utilisation de la première image trouvée et pour voir tout utiliser imageUrls 
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category', // À ajuster
      reviewsCount: 100, // Valeur fictive, à extraire si disponible
      stars: 4.5, // Valeur fictive, à extraire si disponible
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data; // Affiche les données pour débogage

  } catch (error: any) {
    throw new Error(`Failed to scrape Amazon product: ${error.message}`);
  }
}
