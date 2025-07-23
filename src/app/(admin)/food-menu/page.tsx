import { AdminFoodsSection } from "@/components/admin/food-menu/AdminFoodsSection";
import { DishesCategory } from "@/components/admin/food-menu/DishesCategory";

export default function AdminFoodMenu() {
  return (
    <div className="flex flex-col w-full h-full gap-5 p-6 bg-secondary">
      <DishesCategory />

      <AdminFoodsSection />
    </div>
  );
}
