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
var fs = require("fs");
var cheerio = require("cheerio");
// Fichier HTML source
var filePath = './lib/scraper/output.html';
/**
 * Fonction principale pour extraire toutes les données pertinentes
 */
function extractAllHotelData() {
    return __awaiter(this, void 0, void 0, function () {
        var html, $, scriptContent, hotelData, name_1, address, locality, price, reviews, extractedData;
        var _a, _b;
        return __generator(this, function (_c) {
            try {
                html = fs.readFileSync(filePath, 'utf-8');
                $ = cheerio.load(html);
                scriptContent = $('script[type="application/ld+json"]').html();
                hotelData = {};
                if (scriptContent) {
                    try {
                        hotelData = JSON.parse(scriptContent);
                        console.log('Données JSON extraites :', hotelData);
                    }
                    catch (error) {
                        console.error('Erreur lors du parsing JSON :', error.message);
                    }
                }
                name_1 = hotelData['name'] || $('h1.hotel-name-selector').text().trim();
                address = ((_a = hotelData['address']) === null || _a === void 0 ? void 0 : _a.streetAddress) || $('address.hotel-address').text().trim();
                locality = ((_b = hotelData['address']) === null || _b === void 0 ? void 0 : _b.addressLocality) || $('span.locality').text().trim();
                price = $('span.price-amount').text().trim() || 'Prix non disponible';
                reviews = $('span.review-score').text().trim() || 'Avis non disponible';
                extractedData = {
                    name: name_1,
                    address: address,
                    locality: locality,
                    price: price,
                    reviews: reviews,
                    url: hotelData['url'] || 'URL non disponible',
                };
                // 4. Afficher les données extraites
                console.log('Données extraites :', extractedData);
                // 5. Sauvegarder les données dans un fichier JSON
                fs.writeFileSync('./extracted_data.json', JSON.stringify(extractedData, null, 2), 'utf-8');
                console.log('Données sauvegardées dans extracted_data.json');
            }
            catch (error) {
                console.error('Erreur lors de l’extraction des données :', error.message);
            }
            return [2 /*return*/];
        });
    });
}
// Exécuter la fonction
extractAllHotelData();
