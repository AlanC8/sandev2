import apiClient from "./Interceptors";
export interface ClothingItem {
  image: string;
  name: string;
  price: string;
}

interface TopwearItem extends ClothingItem {}

export interface ClothingCollection {
  headwear: ClothingItem;
  topwear: TopwearItem[];
  bottom: ClothingItem;
}

export class ClothGeneratorService {
  static async generateCloth(userPrompt: string) {
    const response = await apiClient.post<ClothingCollection>(
      "/api/v1/generate",
      {
        userPrompt: userPrompt,
      }
    );
    return response;
  }

  static async getGeneratedClothHistory() {
    const response = await apiClient.get<ClothingCollection[]>(
      "/api/v1/history"
    );
    return response;
  }

  static async getImageCloth(image: File) {
    const formData = new FormData();
    formData.append('file', image);

    const response = await apiClient.post<ClothingCollection[]>('api/v1/generate-bypic', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
}
