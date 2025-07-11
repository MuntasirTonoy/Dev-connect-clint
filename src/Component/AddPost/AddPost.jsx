import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { createPost, fetchTags } from "../../Hoocks/Api";
import { AuthContext } from "../../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";

const AddPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  const { data: tagOptions } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const tags = data.tag ? data.tag.map((t) => t.value) : [];

    // Validate tag length manually
    if (!tags.length) {
      return Swal.fire({
        icon: "error",
        title: "Tag Required",
        text: "Please select at least one tag.",
      });
    }

    const post = {
      ...data,
      author: user?.displayName || "Anonymous",
      authorEmail: user?.email || "Anonymous",
      authorPhoto: user?.photoURL || "https://via.placeholder.com/150",
      tag: tags,
      upVote: [],
      downVote: [],
      timeOfPost: new Date().toISOString(),
    };

    setIsSubmitting(true);
    try {
      await createPost(post);
      Swal.fire({
        icon: "success",
        title: "Post Added!",
        text: "Your post has been created successfully.",
      });
      reset();
    } catch (error) {
      console.error("Error adding post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the post!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidation = async () => {
    const valid = await trigger();
    const values = getValues();

    if (!valid) {
      if (errors.title) {
        return Swal.fire("Title Error", errors.title.message, "error");
      }
      if (errors.description) {
        return Swal.fire(
          "Description Error",
          errors.description.message,
          "error"
        );
      }
      return;
    }

    if (!values.tag || values.tag.length === 0) {
      return Swal.fire("Tag Error", "Please select at least one tag.", "error");
    }

    handleSubmit(onSubmit)();
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 space-y-4 text-base-content"
    >
      <h2 className="text-3xl font-bold mb-4">Add New Post</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          {...register("title", {
            required: "Title is required",
            validate: (value) =>
              value.trim().split(" ").length >= 1 ||
              "Title must contain at least 1 word",
          })}
          placeholder="Post Title"
          className="w-full bg-base-300 text-base-content p-3 rounded focus:ring-2 focus:ring-base-content"
        />

        <textarea
          {...register("description", {
            required: "Description is required",
            validate: (value) =>
              value.trim().split(" ").length >= 10 ||
              "Description must be at least 10 words",
          })}
          placeholder="Post Description"
          className="w-full bg-base-300 text-base-content p-3 rounded focus:ring-2 focus:ring-base-content"
          rows={4}
        ></textarea>

        <div>
          <label className="block mb-1 text-sm">Tag</label>
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                placeholder="Select tags"
                className="react-select-container bg-base-300 text-black"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#1f2937",
                  }),
                }}
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleValidation}
          className="bg-black hover:bg-gray-800 w-full text-white py-2 px-6 rounded transition-all ease-in-out cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
