import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SidebarDashLine } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { foodCartContext } from "@/providers/FoodCart";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { foodCart } = useContext(foodCartContext);
  // console.log("Payment order:", foodCart);

  if (!foodCart.length) return;
  const priceCalc = foodCart.map((foods) => {
    return foods.food.price * foods.quantity;

    // setTotal(priceCalc);
  });

  // console.log("price CALC", priceCalc);

  const totalPrice = priceCalc.reduce((acc, curr) => acc + curr, 0);
  // console.log("TOTAL PRICE FINAL", totalPrice); //yooooo order deeree quatity-g shuud oorchlohoor umnuh huuchin array quantity-g awaad bnooo er hereg algaa
  


  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">12₮</p>
        </div>

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Shipping</p>
          <p className="font-bold">12₮</p>
        </div>

        <SidebarDashLine />

        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Total</p>
          <p className="font-bold">{totalPrice}₮</p>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button size="lg" className="w-full bg-red-500 rounded-full">
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
