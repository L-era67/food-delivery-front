import { Badge } from "@/components/ui/badge";
import { Map, Soup, Timer } from "lucide-react";
import { orderDataType } from "./OrderSheetOrders";

export const OrderSheetOrderItem = (props: orderDataType) => {
  console.log("orderFood ITEM:", props);

  return (
    <div className="space-y-3">
      <div className="flex item-center justify-between">
        <h4 className="font-bold">{props.totalPrice}₮ (#20156)</h4>

        <Badge variant="outline" className="border-red-500 rounded-full">
          {props.status}
        </Badge>
      </div>
      {props?.foodOrderItems.map((items) => (
        <div className="flex item-center justify-between" >
          <div className="flex item-center gap-2">
            <Soup strokeWidth={1} size={16} />
            <p className="text-muted-foreground text-xs">
              {items.food.foodName}
            </p>
          </div>
          <p className="text-muted-foreground text-xs">x {items.quantity}</p>
        </div>
      ))}

      <div className="flex item-center gap-2">
        <Timer strokeWidth={1} size={16} />
        <p className="text-muted-foreground text-xs">{props.createdAt}</p>
      </div>

      <div className="flex item-center gap-2">
        <Map strokeWidth={1} size={16} />
        <p className="text-muted-foreground text-xs truncate w-11/12">
          СБД, 12-р хороо, СБД нэгдсэн эмнэлэг 100 айлын гүүрэн гарцны хойд талд
          4д ногоон
        </p>
      </div>
    </div>
  );
};
