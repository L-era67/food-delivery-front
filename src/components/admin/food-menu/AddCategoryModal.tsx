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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { database } from "@/lib/utils/database";

export const AddCategoryModal = () => {
  const [categoryName, setCategoryName] = useState<string>("");

  const createCategoryName = async () => {
    if (!categoryName.trim()) {
      toast.error("Та ангиллынхаа нэрийг оруулна уу!");
      return;
    }
    try {
      const responses = await database("category", "POST",{categoryName});

      const data = await responses.json();
      console.log("log", data);

      if (!responses.ok) {
        toast.error("ERROR!");
        return;
      }

      toast.success(
        `Category ${data.response.categoryName} created successfully`
      );
      console.log("category Data:", data.response.categoryName);

      setCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(`Failed to create category`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-9 h-9 bg-red-500">
          <Plus width={16} height={16} strokeWidth={1} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6">
        <div className="mb-4 flex justify-between items-center">
          <DialogTitle>Add new category</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full w-9 h-9"
            >
              <X />
            </Button>
          </DialogClose>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="font-semibold">
            Category name
          </Label>
          <div>
            <Input
              id="name"
              placeholder="Type category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" className="mt-4" onClick={createCategoryName}>
              Add category
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
