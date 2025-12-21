import { Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function StickyAd({
  position,
}: {
  position: "top" | "fixed-bottom";
}) {
  return (
    <div
      className={`
    w-full bg-indigo-600/10 dark:bg-indigo-500/5 backdrop-blur-md 
    border-y border-indigo-500/20 py-3 px-4 flex items-center justify-center gap-3
    ${position === "top" ? "relative mb-8 top-20" : "fixed bottom-0 left-0 z-50"}
  `}
    >
      <Badge
        variant="outline"
        className="bg-indigo-500 text-white border-none animate-pulse"
      >
        REKLAM
      </Badge>
      <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
        <Megaphone size={14} /> Yeni Kampanyamızı Kaçırmayın! Hemen İnceleyin.
      </p>
      <Button
        variant="link"
        size="sm"
        className="text-indigo-600 dark:text-indigo-400 font-bold underline"
      >
        İncele
      </Button>
    </div>
  );
}
