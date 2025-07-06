import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";
import { database } from "@/lib/utils/database";

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
};

export type FoodInfo = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: string;
};

export const AddFoodModal = ({
  categoryName,
  categoryId,
}: AddFoodModalProps) => {

  const [uploadedImage, setUploadedImage] = useState<File>();

  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName: "",
    price: 0,
    image:"https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // image:
    //   "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ingredients: "",
    categoryId: categoryId,
  });


  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
    
    setFoodInfo((prevFoodInfo) => ({
      ...prevFoodInfo,
      [name]: value,
    }));

  };

  const handleCreateFood = async () => {

    try {

      console.log("foodNAME:", foodInfo);

      const { foodName, price, image, ingredients, categoryId } = foodInfo;

      const response = await database("food", "POST", {foodName, price, image,ingredients, categoryId})

      const data = await response.json();
      console.log("data:", data);

      if (!response.ok) {
        toast.error("ERROR!");
      } else {
        toast.success("Created successfully!");
      }

      setFoodInfo({
        foodName: "",
        price: 0,
        image: "",
        ingredients: "",
        categoryId: categoryId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadedImage(event.target.files[0]);
  };

  console.log("image value", uploadedImage);
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border rounded-3xl bg-background h-[227px] flex flex-col gap-6 justify-center items-center m-1">
          <Button className="bg-red-500 rounded-full w-9 h-9">
            <Plus width={16} height={16} strokeWidth={1} />
          </Button>
          <p className="text-sm text-center w-36">
            Add new Dish to {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-4">

        <div className="flex items-center justify-between mb-4">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full w-9 h-9"
            >
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </div>


        <div className="flex w-full gap-6">
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="foodName" className="ml-1 font-semibold">
              Food name
            </Label>
            <Input
              name="foodName"
              placeholder="Type food name..."
              value={foodInfo.foodName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="price" className="font-semibold">
              Food price
            </Label>
            <Input
              name="price"
              type="number"
              placeholder="Enter price..."
              value={foodInfo.price}
              onChange={handleInputChange}
            />
          </div>

        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="font-semibold">
            Ingredients
          </Label>
          <Input
            name="ingredients"
            placeholder="List ingredients..."
            value={foodInfo.ingredients}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="font-semibold">
            Food image
          </Label>

          <ImageUploader onFileChange={onFileChange} imgFile={uploadedImage} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-4" onClick={handleCreateFood}>
              Add Dish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
