import { Button } from "@/components/ui/button";
import { CarouselExtension } from "./Carousel";

export default function Extension() {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-200 px-3 py-1 text-sm">
                  Виртуальная примерка
                </div>
                <h2 className="text-4xl font-bold tracking-tighter text-gray-800 sm:text-5xl">
                  Визуализируйте идеальную посадку
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl lg:text-base xl:text-xl">
                  Этот экстеншен позволяет заходить на любой сайт и кликать на
                  изображение одежды. В течение нескольких секунд вы получите
                  визуализацию, как эта одежда будет смотреться на вас.
                  Попробуйте функцию виртуальной примерки и убедитесь, что
                  выбранная вещь подходит вам перед покупкой.
                </p>
              </div>
              <Button className="inline-flex h-12 bg-[#254d32] hover:bg-[#1e3d29] text-white items-center justify-center rounded-md px-8 text-lg font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 disabled:pointer-events-none disabled:opacity-50">
                Попробовать сейчас
              </Button>
            </div>
            <div className="flex justify-left">
              <CarouselExtension />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MicroscopeIcon(props: any) {
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
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
