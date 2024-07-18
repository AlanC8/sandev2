import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";

export function CarouselExtension() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = [
    '/alikh.jpg',
    '/alikh-res.jpg',
    '/nurs.jpg',
    '/nurs-res.jpg',
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[400px] h-[500px] mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full h-full">
        {images.map((data, index) => (
          <CarouselItem key={index} className="w-full h-full">
            <div className="p-1 w-full h-full">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-6 w-full h-full">
                  <img src={data}  className="rounded-xl shadow-lg w-full h-full object-cover" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}