import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { Funnel } from "lucide-react";

export default function FilterSwitcher() {
  return (
    <SheetTrigger asChild className="flex lg:hidden">
      <Button variant="outline" className="text-slate-600">
        <Funnel className="size-4" /> Filters
      </Button>
    </SheetTrigger>
  );
}
