"use client";

import { useState, useEffect } from "react";

import { FoodsWithCategories } from "./FoodsWithCategories";

export type categories = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};


export const FoodCategories = () => {

  const [categories, setCategories] = useState<categories[]>([]);

  useEffect(() => {
    
    const getCategories = async () => {
      const response = await fetch("http://localhost:3000/category");
      const data = await response.json();
      console.log("DATA:", data);
      setCategories(data.response);
    };

    console.log("log:", categories);

    if(!categories) return;
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
            console.log("data:", category.categoryName);
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
