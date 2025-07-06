import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UpdateFoodModal } from "./UpdateFoodModal";

type AdminFoodCardProps = {
  food: foodWithCategories;
};

export const AdminFoodCard = ({
  // image,
  // foodName,
  // ingredients,
  // price,
  food,
}: AdminFoodCardProps) => {
  const { image, foodName, ingredients, price } = food;

  const [isUpdateModalOpen, setIsUpdateModelOpen] = useState<boolean>(false);

  const handleUpdateToFood = () => {
    setIsUpdateModelOpen(true);
  };

  const onToggleModal = () => {
    setIsUpdateModelOpen(!isUpdateModalOpen);
  };

  return (
    <div className="border rounded-[20px] p-4 border-border bg-background bg-blue-30 flex flex-col gap-5 min-w-full">
      <div
        className="bg-cover bg-center w-full h-[129px] rounded-xl flex justify-end items-end p-5"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div onClick={handleUpdateToFood}>
          <UpdateFoodModal
            foodItem={food}
            // onToggleModal={onToggleModal}
            // isUpdateModalOpen={isUpdateModalOpen}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[#EF4444] text-sm font-medium">{foodName}</p>
          <p className="text-xs">{price}₮</p>
        </div>
        <p className="text-xs">{ingredients}</p>
      </div>
    </div>
  );
};
