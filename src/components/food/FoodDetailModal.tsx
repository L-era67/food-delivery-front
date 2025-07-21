"use client";

import { Button } from "@/components/ui/button";
import { Plus, X, Minus } from "lucide-react";
import Image from "next/legacy/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useContext, useState } from "react";
import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { foodCartContext } from "@/providers/FoodCart";
import { add } from "date-fns";

type FoodDetailModalProps = {
  food: foodWithCategories;
  isModalOpen: boolean;
  onToggleModal: () => void;
};

export const FoodDetailModal = ({
  food,
  isModalOpen,
  onToggleModal,
}: FoodDetailModalProps) => {

  
  const [quantity, setQuantity] = useState<number>(1);

  const { foodName, image, ingredients, price } = food;

  const foodCarts = useContext(foodCartContext);

  const {  foodCart, addToCart } = foodCarts;

  const [quantity, setQuantity] = useState<number>(1);
  const { foodName, image, ingredients, price } = food;

  const foodCarts = useContext(foodCartContext);
  const { setFoodCart, foodCart } = foodCarts;


  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const subtractQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  // console.log("setFoodCart", foodCart);

  const handleAddToCart = () => {

    addToCart({food, quantity})
    // setFoodCart([
    //   ...foodCart,
    //   {
    //     food: food,
    //     quantity: quantity,
    //   },
    // ]);

    setFoodCart((foodCart) => {
      console.log("anhnii foodcart----", foodCart);

      const exist = foodCart.find((foods) => foods.food._id === food._id);

      if (exist) {
        const filteredFoods = foodCart.filter(
          (foods) => foods.food._id !== food._id
        );
        console.log("food CART ADD OR DEL:", filteredFoods);
        

        return [
          ...filteredFoods,
          {
            food,
            quantity:exist.quantity+1,
          },
        ];
      }

      return [
        ...foodCart,
        {
          food,
          quantity,
        },
      ];

      //  const filteredFood= foodCart.filter((foods)=>foods.food._id===food._id)
      // const filteredFood = foodCart.filter((foods) => {
      //   if (foods.food._id === food._id) {
      //     return;
      //     // return {
      //     //   ...foods,
      //     //   quantity: foods.quantity + 1,
      //     // };
      //   } else {
      //     return [
      //       ...foodCart,
      //       {
      //         food: food,
      //         quantity: quantity,
      //       },
      //     ];
      //   }
      // });
      // // if(filteredFood.includes(food._id)){
      // //   return []
      // // }

      // console.log("filteredFood", filteredFood);

      // console.log("DETAIL FOOD CART:", foodCart);
    });

    setQuantity(1);
    onToggleModal();
  }; //ADD CARD DEER darsnaar (onToggleModal) & hariu butsaad quantity-g 1-s ehluulne Harin "X" btn quatity uurchluhgui

  // const handleAddToCart = () => {
  //   setFoodCart((prev) => [
  //     ...prev,
  //     {
  //       food: food,
  //       quatity: quantity,
  //     },
  //   ]);
  //   setQuantity(1);
  //   onToggleModal();
  // };

<<<<<<< HEAD
  // console.log("food Cart CONTEXT NEMEH :", foodCart);

=======
>>>>>>> b95addd (Hrggui uurchlult)
  const detailTotalPrice = quantity * price;

  //  console.log("food cart context222", foodCartContext);

  return (
    <Dialog open={isModalOpen} onOpenChange={onToggleModal}>
      <DialogContent className="bg-white flex flex-col max-w-[826px] max-h-[412px] sm:rounded-3xl">
        <div className="flex w-full h-full gap-6 rounded-3xl">
          <div className="w-1/2 overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={foodName}
              objectFit="cover"
              layout="responsive"
              width={377}
              height={364}
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col w-1/2 ">
            <div className="flex justify-end">
              <Button
                className="bg-white h-9 w-9  hover:bg-secondary !rounded-full"
                onClick={onToggleModal}
              >
                <X className="text-black" />
              </Button>
            </div>

            <div className="flex flex-col justify-between h-full">
              <DialogHeader>
                <DialogTitle className="text-3xl font-semibold text-red-500">
                  {foodName}
                </DialogTitle>
                <DialogDescription className="text-base font-normal text-[#09090B]">
                  {ingredients}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="flex flex-col text-base font-normal text-[#09090B]">
                    Total price:
                  </p>
                  <div className="text-lg font-semibold text-[#09090B]">
                    <p>{detailTotalPrice}₮</p>
                  </div>
                </div>
                <div className="flex w-[121px] justify-around">
                  <Button
                    onClick={subtractQuantity}
                    className="bg-white rounded-full w-9 h-9"
                    variant="outline"
                  >
                    <Minus className="text-black" />
                  </Button>
                  <p className="flex items-center font-bold">{quantity}</p>
                  <Button
                    onClick={addQuantity}
                    className="bg-white border-current rounded-full w-9 h-9"
                    variant="outline"
                  >
                    <Plus className="text-black" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-black font-medium text-sm px-4 py-2 h-11 w-[377px] rounded-full"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
