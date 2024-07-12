"use client";
import React, { useEffect, useState } from "react";
import renderOutfit from "../components/RenderOutfit";
import MyLoader from "../components/ClothPickerSkeleton";
import { ClothGeneratorService } from "../services/ClothGeneratorService";
import { Spinner } from "../components/Spinner"; // предположим, что у вас есть компонент спиннера

const ClothImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null); // Use appropriate type if known

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setProgress(0);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFile(event.dataTransfer.files[0]);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await ClothGeneratorService.getImageCloth(file);
      setResult(response.data);
      console.log("Enhanced image:", response.data);
    } catch (error) {
      console.error("Error enhancing image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(window !== undefined){
      const authToken = localStorage.getItem("access");
      if(!authToken){
        alert("Please login to use app")
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Outfit Recommendation
          </h1>
          <p className="text-muted-foreground">
            Upload an image and get a personalized outfit recommendation.
          </p>
        </div>
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 space-y-4">
              <div
                className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-md transition-colors group-hover:border-primary"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              >
                {loading ? (
                  <Spinner className="w-12 h-12 text-muted-foreground group-hover:text-primary" />
                ) : file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <UploadIcon className="w-12 h-12 text-muted-foreground group-hover:text-primary" />
                    <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary">
                      Click to upload
                    </p>
                  </>
                )}
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <button
                onClick={handleUpload}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                Найти подходящий наряд
              </button>
              {loading && <progress value={progress} max="100" />}
            </div>
            <div className="bg-background p-8 space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <h2 className="text-2xl font-bold">Recommended Outfit</h2>
                  <p className="text-muted-foreground">
                    Based on your uploaded image
                  </p>
                </div>
                <div className="w-[100%]">
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      <MyLoader width={700} />
                      <MyLoader width={700} />
                      <MyLoader width={700} />
                      <MyLoader width={700} />
                    </div>
                  ) : result ? (
                    renderOutfit(result) // передаем первый элемент массива outfit
                  ) : (
                    renderOutfit(defaultOutfit)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

export default ClothImage;
