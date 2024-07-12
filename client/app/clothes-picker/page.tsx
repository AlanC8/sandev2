"use client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Toaster, toast } from "sonner";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import {
  ClothGeneratorService,
  ClothingCollection,
  ClothingItem,
} from "../services/ClothGeneratorService";
import MyLoader from "../components/ClothPickerSkeleton";
import CardHistoryComponent from "../components/CardHistory";
import renderOutfit from "../components/RenderOutfit";

export const defaultOutfit: any = {
  headwear: {
    image:
      "https://qazaqrepublic.com/uploads/thumbs/panama-beige-2-111cb75276-d55875601f936cded50cd0bd051646ab.jpeg",
    name: "ПАНАМА ҚҰМ ТҮСТЕС",
    price: "12000₸",
  },
  topwear: [
    {
      image:
        "https://qazaqrepublic.com/uploads/thumbs/jaqsy-kunder-purple-2-00c3d2e8cf-ede5a8dc9be58ec2099d7aa8422c13e3.jpeg",
      name: "ФУТБОЛКА JAQSY KÜNDER КҮЛГІН",
      price: "10000₸",
    },
  ],
  bottom: {
    image:
      "https://qazaqrepublic.com/uploads/thumbs/shorts-street-beige-2-4e976a98e6-e8bcdade008ee5cd3ad1723adbac9b0f.jpeg",
    name: "ШОРТЫ STREET САРҒЫШ",
    price: "18000₸",
  },
};

const ClothesPicker = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [clothes, setClothes] = useState<ClothingCollection | null>(null);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [history, setHistory] = useState<ClothingCollection[]>([]);

  const suggestions = [
    "Подбери мне одежду для вечера",
    "Одежда для спортивного мероприятия",
    "Одежда для похода в горы",
    "Повседневная одежда",
  ];

  const getFormattedCurrentDate = () => {
    return format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a");
  };

  const generateCloth = async () => {
    if (userPrompt.trim() === "") {
      toast.error("Please enter your outfit description");
      return;
    }

    setLoading(true);
    const response = await ClothGeneratorService.generateCloth(userPrompt).catch((error) => {
      alert("Please login to use app")
    });
    if(!response) return
    setClothes(response.data);

    setLoading(false);
  };

  const LoadHistory = async () => {
    const historyResponse =
      await ClothGeneratorService.getGeneratedClothHistory();
      if(historyResponse.status === 401){
        alert("Please login to see history")
      }
    setHistory(historyResponse.data); // Add new outfit to history
    console.log(historyResponse.status);
  };
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("access");
      if (authToken) {
        LoadHistory();
        setPermission(true);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 relative">
      <Toaster />
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 text-3xl p-2 bg-gray-800 text-white rounded-md transition-transform transform hover:scale-110"
      >
        🍔
      </button>
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          AI Clothing Generator
        </h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Describe your dream outfit and let our AI generate unique clothing
          designs just for you.
        </p>
      </div>
      <form
        onClick={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4 mt-8"
      >
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe your ideal outfit..."
            className="flex-1"
          />
          <Button
            onClick={() => {
              generateCloth();
              toast.success("Event has been created", {
                description: getFormattedCurrentDate(),
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
              });
            }}
          >
            Generate
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => {
                setUserPrompt(suggestion);
                console.log(suggestion);
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-[-25px] mt-8">Your Outfit</h2>
      {permission ? (
        loading ? (
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
          </div>
        ) : clothes ? (
          renderOutfit(clothes)
        ) : (
          <div className="mt-10">
            <h1>Example OutFit:</h1>
            {renderOutfit(defaultOutfit)}
          </div>
        )
      ) : (
        <h1 className="pt-10">Firstly Login to use app</h1>
      )}

      <div
        className={`fixed inset-0 bg-black bg-opacity-0 z-50 flex transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          ref={sidebarRef}
          className="w-[350px] bg-white h-full p-4 overflow-y-auto shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4">Outfit History</h2>
          {history.length > 0 ? (
            history.map((outfit, index) => (
              <div key={index}>
                <CardHistoryComponent outfit={outfit} />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesPicker;
