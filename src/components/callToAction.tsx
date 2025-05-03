import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function CallToAction() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
        <p className="text-[rgb(20,26,34)]">
          Complete your profile to start receiving tasks.
        </p>
      </div>
      <Button className="bg-[rgb(20,26,34)] hover:bg-[rgb(40,46,54)]">
        Complete Now
      </Button>
    </div>
  );
}
