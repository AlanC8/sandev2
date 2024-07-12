import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

interface AlertDemoProps {
  title: string;
  description: string;
  onClose: () => void;
}

export function AlertDemo({ title, description, onClose }: AlertDemoProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 w-full max-w-md relative">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          ✖
        </button>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
