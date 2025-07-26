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
import { database } from "@/lib/utils/database";
import { useUser } from "@/providers/userProvider";

export const OrderSheetPayment = ({ openModal }: { openModal: () => void }) => {
  const { foodCart, clearFoodCart } = useContext(foodCartContext);
  console.log("Payment order:", foodCart);

  const { user } = useUser();
  console.log("USER ID FIRST: ", user._id);

  if (!foodCart.length) return;

  const priceCalculate = foodCart.map((foods) => {
    return foods.food.price * foods.quantity;
  });

  // console.log("price CALC", priceCalc);

  const totalPrice = priceCalculate.reduce((acc, curr) => acc + curr, 0);

  const checkOutOrder = async () => {
    const response = await database("food-order", "POST", {
      foodOrderItems: foodCart,
      totalPrice: totalPrice,
      userId: `${user._id}`,
    });
    const data = await response.json();
    console.log("handleCreateOrderBY-USER-IDd:", data);
    clearFoodCart();
  };

  return (
    <Card className="mt-6">
      <CardHeader className="p-4 ">
        <CardTitle>Payment info</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between">
          <p className="text-[#71717A] font-light">Items</p>
          <p className="font-bold">{totalPrice}₮</p>
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
        <Button
          size="lg"
          className="w-full bg-red-500 rounded-full"
          onClick={checkOutOrder}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};
