import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSheetEmptyCard } from "./OrderSheetEmptyCard";
import { OrderSheetFoodItem } from "./OrderSheetFoodItem";

import { useContext } from "react";
import { foodCartContext } from "@/providers/FoodCart";

// type cartDataType = {
//   food: foodWithCategories;
//   quantity: number;
// };


// export const cartData = [
//   {
//     food: {
//       _id: "1",
//       foodName: "foodName",
//       price: 1200,
//       image: "",
//       ingredients: "ingredients ingredients",
//       categoryId: {
//         _id: "1",
//         categoryName: "categoryName",
//         createdAt: "2025-06-27T17:00:00+08:00",
//         updatedAt: "2025-06-22T17:00:00+08:00",
//       },
//     },
//     quantity: 1,
//   },
// ];

export const OrderSheetCart = () => {
  
  // const [cartData, setCartData] = useState<cartDataType[]>([]);

  const { foodCart } = useContext(foodCartContext);


  // setCartData(foodCartText?.foodCart);

  const renderFoodCard = () => {
    if (foodCart?.length) {
      return foodCart?.map((item) => {              
        // console.log("item Cart", item);

        return (
          <OrderSheetFoodItem
            key={item.food._id}
            food={item.food}
            quantity={item?.quantity}
            totalPrice={item?.totalPrice}
          />
        );
      });
    }
    return <OrderSheetEmptyCard />;
  };

  return (
    <Card className="h-[400px] overflow-hidden pb-4">
      <CardHeader className="p-4">
        <CardTitle>My cart</CardTitle>
      </CardHeader>

      <CardContent className="h-full p-4 pb-10 overflow-scroll">
        {renderFoodCard()}
      </CardContent>
    </Card>
  );
};
