export async function scrapeBookingProduct(url: string) {
  try {
    // Logique pour scraper Booking.com
    const response = await axios.get(url); // Assurez-vous d'importer `axios`
    const $ = cheerio.load(response.data); // Assurez-vous d'importer `cheerio`

    const name = $('h2[data-testid="title"]').text().trim();
    const address = $('span[data-testid="address"]').text().trim();
    const ratingScore = $('div[data-testid="review-score"]').text().trim();
    const currentPrice = $('span[data-testid="price"]').text().trim();
    const images: string[] = [];

    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) images.push(src);
    });

    return {
      name,
      address,
      ratingScore,
      currentPrice,
      images,
      url,
    };
  } catch (error) {
    console.error('Error scraping Booking.com:', error);
    return null;
  }
}
