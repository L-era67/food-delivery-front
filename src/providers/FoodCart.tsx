"use client";

import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// export const foodCartContext = createContext({
//   foodCart: [{
//     foodName: "Test1",
//     price: 100,
//     quatity: 4,
//   }],
//   setFoodCart: (foodCart: [{ foodName: "Test1"; price: 100; quatity: 4 }]) => {},
// });

type FoodCartContextType = {
  foodCart: { food: foodWithCategories; quantity: number }[];
  setFoodCart: Dispatch<
    SetStateAction<{ food: foodWithCategories; quantity: number }[]>
  >;
};

type FoodCartType = {
  food: foodWithCategories;
  quantity: number;
}[];

export const foodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

console.log("food card context111:", foodCartContext);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [foodCart, setFoodCart] = useState<
  //   { food: foodWithCategories; quantity: number }[]
  // >([]);

  const [foodCart, setFoodCart] = useState<FoodCartType>([]);

  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");
    console.log(cartItems);

    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  return (
    <foodCartContext.Provider value={{ foodCart, setFoodCart }}>
      {children}
    </foodCartContext.Provider>
  );
}
