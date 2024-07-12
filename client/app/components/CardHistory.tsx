import { format } from "date-fns";
import { Card } from "../../components/ui/card";
import { useRouter } from "next/navigation";

export default function CardHistoryComponent({ outfit }) {

    const router = useRouter();

  const getFormattedCurrentDate = () => {
    return format(new Date(outfit.generatedAt), "EEEE, MMMM dd, yyyy 'at' hh:mm a");
  };
  return (
    <Card onClick={() => {
        router.push(`/clothes-picker/${outfit._id}`);
    }} className="w-full max-w-md mt-4 cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={outfit.topwear[0].image}
          alt="Card image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-2xl font-bold text-white">{outfit.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{getFormattedCurrentDate()}</p>
        </div>
      </div>
    </Card>
  );
}
