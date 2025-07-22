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
  decreamentFoodQuantity: (_foodId: string) => void;
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
          totalPrice: (item.quantity + 1) * Number(item.food.price),
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

  const decreamentFoodQuantity = (foodId: string) => {
    const udpatedDecreament = foodCart
      .map(({ food, quantity, totalPrice }) => {
        if (food._id === foodId) {
          const newQuantity = quantity - 1;
          if (newQuantity <= 0) return null;
          // if (quantity <= 0) return null;
          return {
            food,
            quantity: newQuantity,
            totalPrice: newQuantity * Number(food.price),
            // quantity: quantity < 2 ? 1 : quantity-1,
            // quantity: quantity > 1 ? quantity - 1 : 1,
            // totalPrice: (quantity > 1 ? quantity - 1 : 1) * Number(food.price),
          };
        }
        return {
          food,
          quantity,
          totalPrice,
        };
      })
      .filter((item) => item !== null); //.Boolean(null) ugtaa false utga

    // const filteredFoodCart = udpatedDecreament.filter((item) => item !== null);

    console.log("udpatedDecreament", udpatedDecreament);

    setFoodCart(udpatedDecreament);
  };

  const removeFromFoodCart = (foodId: string) => {
    const deleteUpdatedFood = foodCart.filter(
      (item) => item.food._id !== foodId
    );

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
        decreamentFoodQuantity,
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
        totalPrice:
          (item.quantity + newFood.quantity) * Number(newFood.food.price),
      };
    } else {
      return {
        food: item.food,
        quantity: item.quantity,
        totalPrice: Number(item.food.price) * item.quantity,
      };
    }
  });
  return updatedFood;
};
