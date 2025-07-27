import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { addNewTag } from "../../Hoocks/Api";

const AddTags = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      data.popularity = Number(data.popularity);
      const response = await addNewTag(data);
      if (response.success) {
        Swal.fire("Success", "Tag added successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add tag", "error");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-xs rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Tag</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("value", { required: true })}
          placeholder="Value (e.g. javascript)"
          className="w-full input input-bordered"
        />
        <input
          {...register("label", { required: true })}
          placeholder="Label (e.g. JavaScript)"
          className="w-full input input-bordered"
        />
        <input
          {...register("slug", { required: true })}
          placeholder="Slug (e.g. javascript)"
          className="w-full input input-bordered"
        />
        <input
          {...register("category", { required: true })}
          placeholder="Category (e.g. language)"
          className="w-full input input-bordered"
        />
        <input
          type="number"
          {...register("popularity", { required: true })}
          placeholder="Popularity"
          defaultValue={0}
          className="w-full input input-bordered"
        />
        <button type="submit" className="btn bg-black text-white w-full">
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default AddTags;
