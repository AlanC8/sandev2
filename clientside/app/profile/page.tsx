"use client"
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  username: string;
  userImage: string;
}

interface ClothingItem {
  image: string;
  name: string;
  price: string;
}

interface Outfit {
  _id: string;
  headwear: ClothingItem;
  topwear: ClothingItem[];
  bottom: ClothingItem;
  title: string;
  generatedAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access");
        const userResponse = await axios.get("http://localhost:3001/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserHistory = async () => {
      try {
        const token = localStorage.getItem("access");
        const historyResponse = await axios.get("http://localhost:3001/api/v1/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(historyResponse.data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    fetchUserData();
    fetchUserHistory();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.userImage || "/placeholder-user.jpg"} />
          <AvatarFallback>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold">{user?.username || "User"}</h1>
            <p className="text-muted-foreground">@{user?.username || "username"}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline">Change Password</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {history.map((outfit) => (
          <div key={outfit._id} className="relative group">
            <Link href={`/outfit/${outfit._id}`} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Outfit</span>
            </Link>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={outfit.headwear.image}
                alt={outfit.headwear.name}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:opacity-50 transition-opacity"
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <time dateTime={new Date(outfit.generatedAt).toISOString()}>
                {new Date(outfit.generatedAt).toLocaleDateString()}
              </time>
              <p>{outfit.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
