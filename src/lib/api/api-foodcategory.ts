// import { foodWithCategories } from "../types/Types-Categories-Food";

// export const fetchCategories = async () => {
//   const response = await fetch("http://localhost:4200/category");
//   const data = await response.json();
//   console.log("GET CATEGORIES:", data);

//   return data;
// };

// export const fetchCategoriesPost = async (categoryName: string) => {
//   const responses = await fetch("http://localhost:4200/category", {
//     method: "POST",
//     body: JSON.stringify({ categoryName: categoryName }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   return responses;
// };

// export const fetchFoodWithCategories = async () => {
//   const response = await fetch(
//     "http://localhost:4200/"
//   );
//   const data = await response.json();
//   console.log("food DATA:", data);

//   return data;
// };

// export const fetchAddFoodModal = async ({
//   foodName,
//   price,
//   image,
//   ingredients,
//   categoryId,
// }: {
//   foodName: string;
//   price: string;
//   image: string;
//   ingredients: string;
//   categoryId: string;
// }) => {
//   const response = await fetch("http://localhost:4200/food", {
//     method: "POST",
//     body: JSON.stringify({ foodName:foodName, price:price, ingredients:ingredients, categoryId:categoryId, image:image }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   // const data = await response.json();
//   console.log("food DATA:", response);

//   return response;
// };
