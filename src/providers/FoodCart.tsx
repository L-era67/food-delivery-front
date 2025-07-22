"use client";

import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { createContext, useEffect, useState } from "react";

type foodWithQuantityType = {
  food: foodWithCategories;
  quantity: number;
  totalPrice: number;
};

type foodCartContextType = {
  foodCart: foodWithQuantityType[];
  addToCart: (_food: foodWithQuantityType) => void;
  removeFromFoodCart: (_foodId: string) => void;
  increamentFoodQuantity: (_foodId: string) => void;
};

export const foodCartContext = createContext<foodCartContextType>(
  {} as foodCartContextType
);

export default function foodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<foodWithQuantityType[]>([]);

  const addToCart = (newFood: foodWithQuantityType) => {
    console.log("newFood", newFood);

    const existingFood = foodCart.find(
      (item) => item.food._id === newFood.food._id
    );

    console.log("existingFood:", existingFood);

    if (existingFood) {
      const updatedFood = updatedFoodCart(foodCart, newFood);
      console.log("FINAL UPDATED FOOD:", updatedFood);

      setFoodCart(updatedFood);
    } else {
      setFoodCart([...foodCart, newFood]);
    }
  };
  console.log("UPDATED FOOD CART UPDATE:", foodCart);

  const increamentFoodQuantity = (foodId: string) => {
    const updateIncrement = foodCart.map((item) => {
      if (item.food._id === foodId) {
        return {
          food: item.food,
          quantity: item.quantity + 1,
          totalPrice: item.quantity * Number(item.food.price),
        };
      } else {
        return {
          food: item.food,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
      }
    });

    setFoodCart(updateIncrement);
  };

  const removeFromFoodCart = (foodId: string) => {
    console.log("DELETE FOOD ID:", foodId);
    const deleteUpdatedFood = foodCart.filter(
      (item) => item.food._id !== foodId
    );
    console.log("deleteUpdatedFood", deleteUpdatedFood);
    setFoodCart(deleteUpdatedFood);
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");

    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  return (
    <foodCartContext.Provider
      value={{
        addToCart,
        foodCart,
        removeFromFoodCart,
        increamentFoodQuantity,
      }}
    >
      {children}
    </foodCartContext.Provider>
  );
}

const updatedFoodCart = (
  foodCart: foodWithQuantityType[],
  newFood: foodWithQuantityType
) => {
  const updatedFood = foodCart.map((item) => {
    if (item.food._id === newFood.food._id) {
      // console.log("DUPLICATE:", item);
      return {
        food: item.food,
        quantity: item.quantity + newFood.quantity,
        totalPrice: item.quantity * Number(newFood.food.price),
      };
    } else {
      return {
        food: item.food,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      };
    }
  });
  return updatedFood;
};
