import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useLibrary } from "../../context/LibraryContext";

export function BookForm({ isOpen, onClose, initialData }) {
  const { addBook, editBook } = useLibrary();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData && isOpen) {
      reset(initialData);
    } else if (!initialData && isOpen) {
      reset({
        title: "",
        author: "",
        isbn: "",
        category: "",
        quantity: 1,
      });
    }
  }, [initialData, isOpen, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      quantity: parseInt(data.quantity, 10),
    };

    if (initialData) {
      editBook(initialData.id, formattedData);
    } else {
      addBook(formattedData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Book" : "Add New Book"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none mb-1 block">
            Title
          </label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="e.g. The Great Gatsby"
          />
          {errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none mb-1 block">
            Author
          </label>
          <Input
            {...register("author", { required: "Author is required" })}
            placeholder="e.g. F. Scott Fitzgerald"
          />
          {errors.author && (
            <p className="text-sm text-destructive mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none mb-1 block">
            ISBN
          </label>
          <Input
            {...register("isbn", { required: "ISBN is required" })}
            placeholder="e.g. 978-0743273565"
          />
          {errors.isbn && (
            <p className="text-sm text-destructive mt-1">{errors.isbn.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none mb-1 block">
              Category
            </label>
            <Input
              {...register("category", { required: "Category is required" })}
              placeholder="e.g. Fiction"
            />
            {errors.category && (
              <p className="text-sm text-destructive mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium leading-none mb-1 block">
              Quantity
            </label>
            <Input
              type="number"
              min="1"
              {...register("quantity", { required: "Quantity is required", min: 1 })}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Save Changes" : "Add Book"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
