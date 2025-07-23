import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { foodCartContext } from "@/providers/FoodCart";

import { CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type OrderSheetFoodItematype = {
  food: foodWithCategories;
  quantity: number;
  totalPrice: number;
};

export const OrderSheetFoodItem = ({
  food,
  quantity,
  totalPrice,
}: OrderSheetFoodItematype) => {
  const {
    foodCart,
    removeFromFoodCart,
    increamentFoodQuantity,
    decreamentFoodQuantity,
  } = useContext(foodCartContext);



  return (
    <>
      <div className="flex gap-3">
        <div className="w-[124px] h-[120px] relative rounded-lg overflow-hidden">
          <Image
            className="fill"
            src={food?.image}
            objectFit="cover"
            layout="fill"
            alt={food?.foodName}
          />
        </div>

        <div className="w-[300px] flex flex-col justify-between">
          <div className="flex">
            <div className="w-full">
              <h3 className="font-bold text-red-500">{food?.foodName}</h3>
              <div className="flex flex-wrap">
                <p className="text-xs font-light">{food.ingredients}</p>
              </div>
            </div>
            <button onClick={() => removeFromFoodCart(food._id)}>
              {" "}
              <CircleX
                strokeWidth={0.5}
                size={50}
                color="red"
                className="cursor-pointer"
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => decreamentFoodQuantity(food._id)}
              >
                <Minus />
              </Button>

              <div className="text-lg font-semibold">{quantity}</div>

              <Button
                variant="ghost"
                onClick={() => increamentFoodQuantity(food._id)}
              >
                <Plus />
              </Button>
            </div>

            <h4 className="font-bold">{totalPrice}</h4>
          </div>
        </div>
      </div>
      <SidebarDashLine />
    </>
  );
};

// useEffect(() => {
//   // quantity өөрчлөгдөх үед foodCart доторх тухайн item-ийг шинэчлэх
//   setFoodCart((prevCart) =>
//     prevCart.map((item) =>
//       item.food._id === food._id
//         ? { ...item, quantity: changeQuantity }
//         : item
//     )
//   );
// }, [changeQuantity]);
