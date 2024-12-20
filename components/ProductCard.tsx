import { Product } from "../types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
}

// Composant pour afficher une galerie d'images
const ProductGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="gallery">
      {images.map((src, index) => (
        <div key={index} className="gallery-item">
          <Image
            src={src}
            alt={`Product Image ${index + 1}`}
            width={200}
            height={200}
            className="gallery-image"
          />
        </div>
      ))}
    </div>
  );
};

// Composant principal `ProductCard`
const ProductCard = ({ product }: Props) => {
  const images = Array.isArray(product.image) ? product.image : [product.image];

  return (
    <Link href={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        {images.length > 1 ? (
          // Utilisation de la galerie si plusieurs images sont disponibles
          <ProductGallery images={images} />
        ) : (
          // Affichage d'une seule image si aucune galerie n'est nécessaire
          <Image
            src={images[0]}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img"
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>{product.currency}</span>
            <span>{product.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
