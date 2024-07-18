import React from "react";

interface ClothingItem {
  image: string;
  name: string;
  price: string;
}

export interface Outfit {
  headwear: ClothingItem;
  topwear: ClothingItem[];
  bottom: ClothingItem;
}

interface RenderOutfitProps {
  outfit: Outfit;
}

const RenderOutfit: React.FC<RenderOutfitProps> = ({ outfit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {outfit.headwear && (
        <div className="grid gap-4">
          <img src={outfit.headwear.image} alt={outfit.headwear.name} width={300} height={300} />
          <p>{outfit.headwear.name}</p>
          <p>{outfit.headwear.price}</p>
        </div>
      )}
      {outfit.topwear.map((cloth, index) => (
        <div key={index} className="grid gap-4">
          <img src={cloth.image} alt={cloth.name} width={300} height={300} />
          <p>{cloth.name}</p>
          <p>{cloth.price}</p>
        </div>
      ))}
      {outfit.bottom && (
        <div className="grid gap-4">
          <img src={outfit.bottom.image} alt={outfit.bottom.name} width={300} height={300} />
          <p>{outfit.bottom.name}</p>
          <p>{outfit.bottom.price}</p>
        </div>
      )}
    </div>
  );
};

export default RenderOutfit;
