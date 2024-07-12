"use client";
import { useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export function CarouselDemo() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const images = [
    "https://qazaqrepublic.com/uploads/thumbs/fw23-web-makets-hoodie-zipper-ye-f0e19471a6-c2a353b8a3b7f7f1fd446138b37ae185.jpeg",
    "https://qazaqrepublic.com/uploads/thumbs/short-shirt-blue-2-fff24d2ba3-b149a9d758a6dcb40d90d6b6902b7dee.jpeg",
    "https://qazaqrepublic.com/uploads/thumbs/fw23-web-makets-sw-office-melang-41cfb82cb8-6acd3fc5c9cfba55310b81121f3dfda7.jpeg",
    "https://qazaqrepublic.com/uploads/thumbs/fw23-web-makets-ls-ms-white-dbc6ecd157-ef4991bbf1a90803aa847b73c02610e8.jpeg",
    "https://utfs.io/f/0905d846-1c90-4e8a-beba-b442bd3bad7a-4dhcil"
  ]
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs lg:max-w-xl lg:ml-6 cursor-pointer"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((link, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <img src={link} alt="" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
