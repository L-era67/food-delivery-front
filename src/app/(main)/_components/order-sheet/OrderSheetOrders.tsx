"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { database } from "@/lib/utils/database";
import { useEffect, useState } from "react";
import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { useUser } from "@/providers/userProvider";

// {
//     "_id": "6880dc57154b4898d5716e95",
//     "userId": "68805b924d989dd3a3f6cb3e",
//     "totalPrice": 6000,
//     "status": "Pending",
//     "foodOrderItems": [
//         {
//             "food": {
//                 "_id": "686535d9e4d1bd2b132c3cf8",
//                 "foodName": "Lasagna",
//                 "price": 1000,
//                 "image": "https://images.unsplash.com/photo-1629115916087-7e8c114a24ed?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                 "ingredients": "pasta sheets, ground beef, tomato sauce, béchamel sauce, mozzarella, parmesan, herbs",
//                 "categoryId": "6865f631e8e6349606ec2f30",
//                 "createdAt": "2025-07-02T13:36:25.136Z",
//                 "updatedAt": "2025-07-22T06:43:21.267Z",
//                 "__v": 0
//             },
//             "quantity": 1,
//             "_id": "6880dc57154b4898d5716e96"
//         },
//         {
//             "food": {
//                 "_id": "686a3dcb7cfecf9883bff536",
//                 "foodName": "Spaghetti Bolognese",
//                 "price": 2500,
//                 "image": "https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                 "ingredients": "pasta, ground beef, tomato sauce, onion, garlic",
//                 "categoryId": "6865f631e8e6349606ec2f30",
//                 "createdAt": "2025-07-06T09:11:39.003Z",
//                 "updatedAt": "2025-07-22T06:43:28.785Z",
//                 "__v": 0
//             },
//             "quantity": 2,
//             "_id": "6880dc57154b4898d5716e97"
//         }
//     ],
//     "createdAt": "2025-07-23T12:57:59.100Z",
//     "updatedAt": "2025-07-23T12:57:59.100Z",
//     "__v": 0
// }

type foodOrderItemsType = {
  food: foodWithCategories;
  quantity: number;
  _id: string;
};
export type orderDataType = {
  _id: string;
  userId: string;
  totalPrice: number;
  status: string;
  foodOrderItems: foodOrderItemsType[];
  createdAt: string;
  updatedAt: string;
};
type orderResponseType = {
  success: string;
  response: orderDataType[];
};

export const OrderSheetOrders = () => {
  const [orderData, setOrderData] = useState<orderDataType[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getOrderByUserId = async () => {
      const response = await database(`food-order/${user._id}`);

      const data = (await response.json()) as orderResponseType;

      console.log("getOrderByUserId:", data);
      setOrderData(data.response);
    };

    getOrderByUserId();
  }, []);

  console.log("pppppppp:", orderData);

  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4 ">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        {orderData.map((orderFood: orderDataType, i) => (
          <OrderSheetOrderItem key={i} {...orderFood} />
        ))}
      </CardContent>
    </Card>
  );
};
