"use client";

import { useEffect, useState } from "react";
// import { foodWithCategories } from "@/app/(main)/_components/food-with-category/FoodsWithCategories";
import { AddFoodModal } from "./AddFoodModal";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { fetchFoodWithCategories } from "@/lib/api/api-foodcategory";
import { CategoryIdWithFoods } from "@/lib/types/Types-Categories-Food";

// export type FoodCategory = {
//   _id: string;
//   categoryName: string;
//   count: number;
//   foods: {
//     _id: string;
//     foodName: string;
//     price: number;
//     image: string;
//     ingredients: string;
//     createdAt?: string;
//     updatedAt?: string;
//   }[];
// };

export const AdminFoodsSection = () => {
  const [foodWithCategories, setFoodWithCategories] = useState<CategoryIdWithFoods[]>(
    []
  );

  useEffect(() => {
    const getAdminFoods = async () => {

      const data = await fetchFoodWithCategories();
      setFoodWithCategories(data.response);
      console.log("admin cat:", data.response);

    };

    getAdminFoods();
  }, []);

  if (!foodWithCategories) return null;

  if (!foodWithCategories.length) return <AdminFoodSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {foodWithCategories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-6 bg-background rounded-xl"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>
            <p className="flex items-center">{category.count}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
            />
            {category.foods.map((food) => (
              <div key={`${food._id}`} className="flex gap-2">
                <AdminFoodCard
                  // image={food.image}
                  // price={food.price}
                  // ingredients={food.ingredients}
                  // foodName={food.foodName}
                  food = {food}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
