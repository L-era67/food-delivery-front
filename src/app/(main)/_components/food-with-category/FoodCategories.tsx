"use client";

import { useState, useEffect } from "react";

import { FoodsWithCategories } from "./FoodsWithCategories";
import { fetchCategories } from "@/lib/api/api-foodcategory";
import { categories } from "@/lib/types/Types-Categories-Food";

export const FoodCategories = () => {
  const [categories, setCategories] = useState<categories[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      console.log("<--CATEGORIES-->", data.response);
      setCategories(data.response);
    };

    getCategories();
  }, []);

  if (!categories?.length)
    return <p className="text-white">No categories found</p>;

  return (
    <div>
      <div className="flex flex-col my-8 gap-9">
        <div className="text-3xl font-semibold text-white">Categories</div>
        <div className="flex gap-2 flex-nowrap">
          {categories?.map((category) => {
            console.log("<--CATEGORY ITEM-->", category.categoryName);
            return (
              <div
                key={category._id}
                className="flex items-center px-5 py-1 rounded-full bg-background"
              >
                <div>{category?.categoryName}</div>
              </div>
            );
          })}
        </div>
      </div>

      <FoodsWithCategories />
    </div>
  );
};
