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

// {
//     "_id": "6882d5d234cc005bdaea2e5e",
//     "email": "test1@gmail.com",
//     "password": "$2b$10$.wcC/LvGuXwvkULd9j9mTuMnJt6PXfN97H9/n1LbBmwKGj.ocM9Qi",
//     "phoneNumber": "7777",
//     "address": "han-uul",
//     "role": "User",
//     "orderedFoods": [],
//     "isVerified": false,
//     "createdAt": "2025-07-25T00:54:42.713Z",
//     "updatedAt": "2025-07-25T00:54:42.713Z",
//     "__v": 0
// }

export type userDetailType = {
  _id:string,
  email:string,
  password:string,
  phoneNumber:string,
  address:string,
  role:string,
  isVerified:boolean,
  createdAt:string,
  updatedAt:string,
  __v:string
}