import mongoose from "mongoose";

const previewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nom de l'établissement
    location: {
      city: { type: String, required: true }, // Ville (ex : Patong Beach)
      distanceFromCenter: { type: String }, // Distance du centre (ex : 1,5 km)
      distanceFromBeach: { type: String }, // Distance de la plage (ex : 400 m)
    },
    rating: {
      score: { type: Number, required: true }, // Note moyenne (ex : 7,8)
      description: { type: String }, // Description de la note (ex : Bien)
      reviewsCount: { type: Number, required: true }, // Nombre d'expériences vécues
    },
    offers: {
      type: [
        {
          title: { type: String }, // Type d'offre (ex : Offre Black Friday)
          roomType: { type: String }, // Type de chambre (ex : Chambre Panorama)
          bedType: { type: String }, // Type de lit (ex : 1 grand lit double)
          includesBreakfast: { type: Boolean, default: false }, // Petit-déjeuner inclus ou non
          price: {
            original: { type: Number }, // Tarif initial (ex : 784)
            current: { type: Number, required: true }, // Tarif actuel (ex : 172)
            taxesIncluded: { type: Boolean, default: true }, // Taxes incluses ou non
          },
          availabilityMessage: { type: String }, // Message sur la disponibilité (ex : Plus qu'1 à ce prix)
          totalNights: { type: Number }, // Nombre de nuits (ex : 1)
          totalGuests: { type: Number }, // Nombre d'adultes (ex : 2)
        },
      ],
      required: true,
    },
    priceSummary: {
      totalPrice: { type: Number, required: true }, // Prix total (ex : 172)
      currency: { type: String, default: "EUR" }, // Devise (ex : €)
    },
  },
  { timestamps: true },
);

const Preview =
  mongoose.models.Preview || mongoose.model("Preview", previewSchema);

export default Preview;
