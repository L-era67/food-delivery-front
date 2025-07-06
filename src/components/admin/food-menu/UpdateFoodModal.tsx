import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { foodWithCategories } from "@/lib/types/Types-Categories-Food";
import { database } from "@/lib/utils/database";
import { Pencil, Trash, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { FoodInfo } from "./AddFoodModal";
import { toast } from "sonner";

type UpdateFoodModalType = {
  foodItem: foodWithCategories;
  //   onToggleModal: () => void;
  //   isUpdateModalOpen: boolean;
};

export const UpdateFoodModal = ({
  foodItem,
}: //   onToggleModal,
//   isUpdateModalOpen,
UpdateFoodModalType) => {
  const { _id, price, foodName, ingredients, image, categoryId } = foodItem;


  const [updateFood, setUpdateFood] = useState<FoodInfo>({
    foodName: foodName,
    categoryId: categoryId,
    price: price,
    ingredients: ingredients,
    image: image,
  }); //default utgiin anh baisan buyu uurchluhiiin umnuh utgaar uguhgui bol 1 zuiliig uurchluhad bugdeerei hooson bolood baina.


  const handleUpdateFood = async () => {
    const { foodName, price, ingredients, image, categoryId } = updateFood;
    try {
      const response = await database(`food/${_id}`, "PUT", {
        price,
        foodName,
        ingredients,
        image,
        categoryId,
      });

      if(response.ok){
        toast.success("Food updated successfully.")
      }

      const UpdateFood = await response.json();

    //   onToggleModal();
    } catch (error) {
      console.log("Update food ERROR!");
    }
  };

  const handleDeleteFood = async () => {
    // const { _id } = foodItem;

    try {
      const response = await database(`food/${_id}`, "DELETE", { _id });

      if (response.ok) {
        toast.success(
          <p>
            <b>Dish successfully deleted.</b> <br/>"Would you like to undo this
            action?"{" "}
          </p>
        );
      }
    } catch (error) {
      console.log("Delete food ERROR!");
      toast.error("Error!")
    }
  };

  const handleInputsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateFood((prevFoodInfo) => ({
      ...prevFoodInfo,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex justify-center items-center rounded-full bg-background h-11 w-11"
          >
            <Pencil color="#EF4444" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Dishes Info</DialogTitle>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full w-9 h-9"
                >
                  <X />
                </Button>
              </DialogClose>
              {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
            </div>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="flex gap-3 w-full">
              <Label htmlFor="dishName" className="font-normal text-xs w-1/3">
                Dish name
              </Label>
              <Input
                id="dishName"
                name="foodName"
                defaultValue=""
                onChange={handleInputsChange}
              />
            </div>

            <div className="flex gap-3 w-full">
              <Label
                htmlFor="dishCategory"
                className="font-normal text-xs w-1/3"
              >
                Dish category
              </Label>
              <Input
                id="category"
                name="categoryId"
                defaultValue=""
                onChange={handleInputsChange}
              />
            </div>

            <div className="flex gap-3 w-full">
              <Label
                htmlFor="dishCategory"
                className="font-normal text-xs w-1/3"
              >
                Ingredients
              </Label>
              <Textarea
                name="ingredients"
                placeholder="enter your ingredients..."
                onChange={handleInputsChange}
              />
              {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
            </div>

            <div className="flex gap-3 w-full">
              <Label
                htmlFor="dishCategory"
                className="font-normal text-xs w-1/3"
              >
                Price
              </Label>
              <Input
                id="price"
                name="price"
                defaultValue=""
                onChange={handleInputsChange}
              />
            </div>

            <div className="flex gap-3 w-full">
              <Label
                htmlFor="dishCategory"
                className="font-normal text-xs w-1/3"
              >
                Image
              </Label>
              <Input
                id="image"
                name="image"
                defaultValue=""
                onChange={handleInputsChange}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <div>
                <DialogClose asChild>
                  <Button variant="outline" className="border-red-600" onClick={handleDeleteFood}>
                    <Trash className="text-red-600" />
                  </Button>
                </DialogClose>
              </div>
              <div>
                <DialogClose>
                  <Button type="submit" onClick={handleUpdateFood}>
                    Save changes
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
