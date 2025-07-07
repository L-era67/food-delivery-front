"use client";

import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { createContext, Dispatch, SetStateAction, useState } from "react";

// export const foodCartContext = createContext({
//   foodCart: [{
//     foodName: "Test1",
//     price: 100,
//     quatity: 4,
//   }],
//   setFoodCart: (foodCart: [{ foodName: "Test1"; price: 100; quatity: 4 }]) => {},
// });

type FoodCartContextType = {
    foodCart:{food:foodWithCategories; quatity:number}[];
    setFoodCart: Dispatch<SetStateAction<{food:foodWithCategories; quatity:number}[]>>;
}

export const foodCartContext = createContext<FoodCartContextType>({} as FoodCartContextType);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<{food:foodWithCategories; quatity:number}[]>([]);
  return (
    <foodCartContext.Provider value={{ foodCart, setFoodCart }}>
      {children}
    </foodCartContext.Provider>
  );
}
