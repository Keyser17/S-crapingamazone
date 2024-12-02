"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeBookingProduct = scrapeBookingProduct;
var axios_1 = require("axios");
var cheerio = require("cheerio");
function scrapeBookingProduct(url) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, port, session_id, options, response, html, $, scriptContent, utagDataMatch, utagData, hotelName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!url)
                        return [2 /*return*/];
                    username = String(process.env.BRIGHT_DATA_USERNAME);
                    password = String(process.env.BRIGHT_DATA_PASSWORD);
                    port = 22225;
                    session_id = (1000000 * Math.random()) | 0;
                    options = {
                        auth: {
                            username: "".concat(username, "-session-").concat(session_id),
                            password: password,
                        },
                        host: 'brd.superproxy.io',
                        port: port,
                        rejectUnauthorized: false,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 2:
                    response = _a.sent();
                    html = response.data;
                    $ = cheerio.load(html);
                    scriptContent = $('script:contains("window.utag_data")').html();
                    if (scriptContent) {
                        utagDataMatch = scriptContent.match(/window\.utag_data\s*=\s*(\{.*?\});/);
                        if (utagDataMatch && utagDataMatch[1]) {
                            utagData = JSON.parse(utagDataMatch[1]);
                            hotelName = utagData.hotel_name || 'Nom non trouvé';
                            console.log('Nom de l’hôtel extrait :', hotelName);
                            return [2 /*return*/, hotelName];
                        }
                        else {
                            console.error('Impossible de parser `utag_data`.');
                        }
                    }
                    else {
                        console.error('Script contenant `utag_data` introuvable.');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erreur lors de la récupération des données :', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Exemple d'utilisation
scrapeBookingProduct('https://www.booking.com/hotel/th/zen-seana-resort.fr.html?aid=356980&label=gog235jc-1FCAso3QFCEHplbi1zZWFuYS1yZXNvcnRIDVgDaE2IAQGYAQ24ARfIAQzYAQHoAQH4AQKIAgGoAgO4AuWZrroGwAIB0gIkMTMyYTBhNWMtZWVlMS00M2RhLThhNjUtZjRmNzc0Mzg2MzY12AIF4AIB&sid=8f14c2134b74a3a1c0c92a40931ddf44&all_sr_blocks=399498605_225382784_2_1_0_237802&checkin=2024-12-02&checkout=2024-12-03&dest_id=-3406238&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=399498605_225382784_2_1_0_237802&hpos=1&matching_block_id=399498605_225382784_2_1_0_237802&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=399498605_225382784_2_1_0_237802_623700&srepoch=1733004824&srpvid=6d719c4b381f033c&type=total&ucfs=1&');
