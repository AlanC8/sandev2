"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../../components/Spinner"; // Assuming you have a Spinner component

interface ClothingItem {
  image: string;
  name: string;
  price: string;
}

interface Outfit {
  headwear: ClothingItem;
  topwear: ClothingItem[];
  bottom: ClothingItem;
  title: string;
  generatedAt: string;
}

const OutFitDetails = () => {
  const params = useParams();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(`http://localhost:3001/api/v1/history/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOutfit(response.data);
      } catch (error) {
        console.error("Error fetching outfit:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOutfit();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-[100px]" />
      </div>
    );
  }

  if (!outfit) {
    return <div className="flex justify-center items-center min-h-screen">Outfit not found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{outfit.title}</h1>
      <p className="text-gray-600 mb-8">{new Date(outfit.generatedAt).toLocaleDateString()}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <img src={outfit.headwear.image} alt={outfit.headwear.name} className="w-48 h-48 object-cover mb-4" />
          <p className="text-xl font-semibold">{outfit.headwear.name}</p>
          <p className="text-gray-500">{outfit.headwear.price}</p>
        </div>
        {outfit.topwear.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={item.image} alt={item.name} className="w-48 h-48 object-cover mb-4" />
            <p className="text-xl font-semibold">{item.name}</p>
            <p className="text-gray-500">{item.price}</p>
          </div>
        ))}
        <div className="flex flex-col items-center">
          <img src={outfit.bottom.image} alt={outfit.bottom.name} className="w-48 h-48 object-cover mb-4" />
          <p className="text-xl font-semibold">{outfit.bottom.name}</p>
          <p className="text-gray-500">{outfit.bottom.price}</p>
        </div>
      </div>
    </div>
  );
};

export default OutFitDetails;
