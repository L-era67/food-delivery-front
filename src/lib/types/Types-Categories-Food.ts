export type categories = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type foodWithCategories = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: categories;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CategoryIdWithFoods = {
  _id: string;
  categoryName: string;
  count: number;
  foods: foodWithCategories[];
};
