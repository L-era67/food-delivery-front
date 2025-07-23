"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetOrderItem } from ".";
import { database } from "@/lib/utils/database";
import { useEffect, useState } from "react";
import { log } from "console";

export const OrderSheetOrders = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await database("food-order/685d5a190454ba92b9d1316c");
      console.log("respinsee:", response);

      const data = await response.json();

      console.log("dattatta:",    data);
      setOrderData(data.response);
    };

    getCategories();
  }, []);

  console.log("pppppppp:", orderData);

  return (
    <Card className="h-[87%]">
      <CardHeader className="p-4 ">
        <CardTitle>Order history</CardTitle>
      </CardHeader>

      <CardContent className="p-4">{<OrderSheetOrderItem />}</CardContent>
    </Card>
  );
};
