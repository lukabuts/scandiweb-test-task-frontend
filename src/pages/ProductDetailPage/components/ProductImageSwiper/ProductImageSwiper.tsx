import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const ProductImageSwiper = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div
      className="flex flex-4 gap-10 h-fit max-lg:flex-col-reverse"
      data-testid="product-gallery"
    >
      <div className="flex lg:flex-col overflow-x-auto gap-4 shrink-0 max-h-[550px]">
        {images.length > 1 &&
          images.map((img, idx) => (
            <button
              onClick={() => setActiveImage(idx)}
              key={idx}
              className={`cursor-pointer shrink-0  ${
                activeImage === idx ? "border border-gray-300" : ""
              }`}
            >
              <img src={img} className="size-20 object-cover shrink-0" />
            </button>
          ))}
      </div>
      <div className="w-full group relative flex items-center justify-center">
        <img
          src={images[activeImage]}
          alt="Product Image"
          className="sm:h-detailed-image-height h-96 w-full max-w-xl object-contain object-center"
        />
        {images.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-black/80 p-1"
              onClick={() =>
                setActiveImage(
                  (prev) => (prev - 1 + images.length) % images.length
                )
              }
            >
              <ChevronLeft className="text-white" />
            </button>
            <button
              className="bg-black/80 p-1"
              onClick={() =>
                setActiveImage((prev) => (prev + 1) % images.length)
              }
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageSwiper;
