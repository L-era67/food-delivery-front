"use client";

import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/legacy/image";
import { MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import { AddToCartAlert } from "./AddToCartAlert";
import { FoodDetailModal } from "./FoodDetailModal";
import { foodWithCategories } from "@/lib/types/Types-Categories-Food";

type FoodCardType = {
  food: foodWithCategories;
};

export const FoodCard = ({ food }: FoodCardType) => {
  const { foodName, price, ingredients, image } = food;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);//FOOD  DETAIL DIALOG-G GADNAAS CONTROLLDOH HESEG
  const [showAlert, setShowAlert] = useState<boolean>(false);// ADD CART BTN DARAH GARCH IREH ALERT

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {  //(event :React.MouseEvent<HTMLButtonElement>)=>{}
    console.log("foodCard-EVENT:",event);
    setShowAlert(true);
  };

  const handleAlertRemove = () => {
    setShowAlert(false);
  };

  return (
    <div className="w-full">
      <div onClick={onToggleModal}>
        <Card className="flex flex-col gap-5 p-4 bg-white border-none shadow-none cursor-pointer w-99 h-86 rounded-3xl">
          <div className="relative flex items-end justify-end overflow-hidden h-52 rounded-3xl">
            <Image src={image} alt={foodName} objectFit="cover" layout="fill" />
            <Button
              className="absolute bg-white rounded-full w-11 h-11 bottom-5 right-5"
              onClick={handleAddToCart}
            >
              <Plus color="red" />
            </Button>
          </div>

          <div className="w-full">
            <div className="flex justify-between gap-2">
              <p className="text-2xl font-semibold text-red-500">{foodName}</p>
              <p className="text-lg font-semibold text-[#09090B]">{price}₮</p>
            </div>

            <div className="mt-2 text-sm text-[#09090B] font-normal">
              {ingredients}
            </div>
          </div>
        </Card>
      </div>
      <FoodDetailModal
        food={food}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />
      <AddToCartAlert isVisible={showAlert} onHide={handleAlertRemove} />
    </div>
  );
};
