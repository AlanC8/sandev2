import { ClothingItem } from "../services/ClothGeneratorService";

const renderOutfit = (outfit: any) => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {Object.keys(outfit).map((key) => {
        if (key === "topwear") {
          return (outfit[key] as ClothingItem[]).map((cloth, index) => (
            <div key={index} className="grid gap-2">
              <img
                src={cloth.image}
                alt={cloth.name}
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square"
              />
              <div className="space-y-1">
                <h3 className="font-medium">{cloth.name}</h3>
                <p className="text-sm text-muted-foreground">{cloth.price}</p>
              </div>
            </div>
          ));
        } else {
          const cloth = outfit[key] as ClothingItem;
          return (
            <div key={key} className="grid gap-4">
              <img
                src={cloth.image}
                alt={cloth.name}
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square"
              />
              <div className="space-y-1">
                <h3 className="font-medium">{cloth.name}</h3>
                <p className="text-sm text-muted-foreground">{cloth.price}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default renderOutfit;
