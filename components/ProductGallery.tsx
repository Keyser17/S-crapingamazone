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

export default ProductGallery;
