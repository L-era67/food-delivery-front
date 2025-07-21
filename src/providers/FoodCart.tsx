"use client";

import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { createContext, useEffect, useState } from "react";

//TYPE--------------------------------------------------------------------------------------
type foodWithQuantityType = {
  food: foodWithCategories;
  quantity: number;
};

type foodCartContextType = {
  foodCart: foodWithQuantityType[];
  addToCart: (_food: foodWithQuantityType) => void;
  removeFromFoodCart: (_foodId: string) => void;
};

//CREATE CONTEXT-----------------------------------------------------------------------------
export const foodCartContext = createContext<foodCartContextType>(
  {} as foodCartContextType
);

//-------------------------------------------------------------------------------------------
export default function foodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<foodWithQuantityType[]>([]);

  // ADDTOCART -------------------------------------------------------------------------------
  const addToCart = (food: foodWithQuantityType) => {
    // console.log("EXIST PREV DATA:", food);

    const existingFood = foodCart.filter(
      (item) => item.food._id === food.food._id
    );
    // console.log("FILTERED exisFOOD:::::", existingFood);

    if (existingFood.length > 0) {
      const updatedFood = foodCart.filter(
        (item) => item.food._id !== food.food._id
      );
      // console.log("updatedFood", updatedFood);
      setFoodCart([
        ...updatedFood,
        { food: food.food, quantity: existingFood[0].quantity + food.quantity },
      ]);
    } else {
      setFoodCart([...foodCart, food]);
    }
  };

  //REMOVE -----------------------------------------------------------------------------------
  const removeFromFoodCart = (foodId: string) => {
    console.log("DELETE FOOD ID:", foodId);
    const deleteUpdatedFood = foodCart.filter(
      (item) => item.food._id !== foodId
    );
    console.log("deleteUpdatedFood", deleteUpdatedFood);
    setFoodCart(deleteUpdatedFood);
  };

  //LOCAL STORAGE-----------------------------------------------------------------------------
  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");

    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  return (
    <foodCartContext.Provider
      value={{ addToCart, foodCart, removeFromFoodCart }}
    >
      {children}
    </foodCartContext.Provider>
  );
}
