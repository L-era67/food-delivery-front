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

type foodWithQuantityType = {
  food: foodWithCategories;
  quantity: number;
};

type FoodCartContextType = {
  foodCart: foodWithQuantityType[];
  // setFoodCart: Dispatch<SetStateAction<foodWithQuantityType[]>>;
  addToCart:(_food:foodWithQuantityType)=>void;
  removeFromCart:(_foodId:string) => void;
};



export const foodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  const [foodCart, setFoodCart] = useState<foodWithQuantityType[]>([]);

  const addToCart = (food:foodWithQuantityType) =>{
    console.log("add buttun foodCart:", food);
    
    
    setFoodCart([...foodCart, food])
  }

  const removeFromCart = (foodId:string) =>{
    console.log("REMOVER FOOD CART ID", foodId);

    const filteredFood = foodCart.filter((food)=> food.food._id !== foodId)
    console.log("USTAGAGDSAN FOODS FILTER:", filteredFood);
    setFoodCart(filteredFood)
    
    
  }

  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");
    // console.log(cartItems);

    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  return (
    <foodCartContext.Provider value={{ foodCart, addToCart, removeFromCart}}>
      {children}
    </foodCartContext.Provider>
  );
}
