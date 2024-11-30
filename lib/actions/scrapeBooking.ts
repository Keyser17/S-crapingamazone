import { scrapeBookingDetails } from '../scraper/index';

(async () => {
  const url = 'https://www.booking.com/searchresults.fr.html?aid=356980&label=gog235jc-1DCAso3QFCEHplbi1zZWFuYS1yZXNvcnRIDVgDaE2IAQGYAQ24ARfIAQzYAQPoAQH4AQKIAgGoAgO4AuWZrroGwAIB0gIkMTMyYTBhNWMtZWVlMS00M2RhLThhNjUtZjRmNzc0Mzg2MzY12AIE4AIB&highlighted_hotels=3994986&redirected=1&city=-3406238&hlrd=user_sh&source=hotel&expand_sb=1&keep_landing=1&sid=8f14c2134b74a3a1c0c92a40931ddf44';
  const data = await scrapeBookingDetails(url);
  console.log(data);
})();
