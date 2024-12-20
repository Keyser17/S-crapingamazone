import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";

export async function scrapeBookingProduct(url: string) {
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
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Récupérer la page avec axios
    const response = await axios.get(url);
    const html = response.data;

    // Charger le HTML avec Cheerio
    const $ = cheerio.load(html);

    // Rechercher le script contenant `utag_data`
    const scriptContent = $('script:contains("window.utag_data")').html();

    if (scriptContent) {
      // Extraire `utag_data` avec une expression régulière
      const utagDataMatch = scriptContent.match(
        /window\.utag_data\s*=\s*(\{.*?\});/,
      );

      if (utagDataMatch && utagDataMatch[1]) {
        // Convertir la chaîne en objet JSON
        const utagData = JSON.parse(utagDataMatch[1]);

        // Extraire le nom de l'hôtel
        const hotelName = utagData.hotel_name || "Nom non trouvé";

        console.log("Nom de l’hôtel extrait :", hotelName);
        return hotelName;
      } else {
        console.error("Impossible de parser `utag_data`.");
      }
    } else {
      console.error("Script contenant `utag_data` introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Exemple d'utilisation
scrapeBookingProduct(
  "https://www.booking.com/hotel/th/zen-seana-resort.fr.html?aid=356980&label=gog235jc-1FCAso3QFCEHplbi1zZWFuYS1yZXNvcnRIDVgDaE2IAQGYAQ24ARfIAQzYAQHoAQH4AQKIAgGoAgO4AuWZrroGwAIB0gIkMTMyYTBhNWMtZWVlMS00M2RhLThhNjUtZjRmNzc0Mzg2MzY12AIF4AIB&sid=8f14c2134b74a3a1c0c92a40931ddf44&all_sr_blocks=399498605_225382784_2_1_0_237802&checkin=2024-12-02&checkout=2024-12-03&dest_id=-3406238&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=399498605_225382784_2_1_0_237802&hpos=1&matching_block_id=399498605_225382784_2_1_0_237802&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=399498605_225382784_2_1_0_237802_623700&srepoch=1733004824&srpvid=6d719c4b381f033c&type=total&ucfs=1&",
);
