import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { OrderSheetContents } from ".";
import { useContext } from "react";
import FoodCartContextProvider, { foodCartContext } from "@/providers/FoodCart";

type OrderSheetProps = {
  open: boolean;
  closeSidebar: () => void;
  openModal: () => void;
};

export const OrderSheet = ({
  open,
  closeSidebar,
  openModal,
}: OrderSheetProps) => {

  const foodCartText = useContext(foodCartContext)
  console.log("foodCart Provider", foodCartText);
  
  return (
    <Sheet open={open} onOpenChange={closeSidebar}>
      <SheetContent className="sm:max-w-[535px] rounded-s-lg border-none bg-[#404040]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-white">
            <ShoppingCart size={24} />
            Order detail 
          </SheetTitle>
        </SheetHeader>

        <OrderSheetContents openModal={openModal} />
      </SheetContent>
    </Sheet>
  );
};
