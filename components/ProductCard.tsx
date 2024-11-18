import { Product } from '@/types'; // Import the Product type from the types file type file it's a good practice to keep all the types in one file
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }: Props) => {
   return (
    <Link href={`/products/${product._id}`} className="product-card">
        <div className="product-card-image-container">
            <Image 
            src={product.image[0]}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img"
            />
        </div>
        <div className="flex justify-between">
            <h3 className="product-title">{product.title}</h3>
            <p>{product.currentPrice}</p>

            <div className="flex justify-between">
                <p className="text-black opacity-50 text-lg capitalize ">
                {product.category}
                </p>

                <p className="text-color text-lg font-semibold"> 
                <span>{product?.currency} </span>
                <span>{product?.currentPrice} </span>
                </p>
            </div>
        </div>
    </Link>
    )
}

export default ProductCard