import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const AddPost = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // For multi-select, selected tags come as array of objects,
    // so map to an array of values for easier use:
    const tags = data.tag ? data.tag.map((t) => t.value) : [];

    const post = {
      ...data,
      tag: tags,
      upVote: 0,
      downVote: 0,
    };
    console.log(post);
  };

  const tagOptions = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node.js" },
    { value: "Docker", label: "Docker" },
    { value: "Laravel", label: "Laravel" },
    { value: "PhP", label: "PhP" },
    { value: "MongoDB", label: "MongoDB" },
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 space-y-4 text-base-content"
    >
      <h2 className="text-xl font-bold mb-4">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("authorImage")}
          placeholder="Author Image URL"
          className="w-full bg-base-300 p-3 rounded focus:ring-2 focus:ring-base-content"
        />
        <input
          {...register("authorName")}
          placeholder="Author Name"
          className="w-full bg-base-300 p-3 rounded focus:ring-2 focus:ring-base-content"
        />
        <input
          {...register("authorEmail")}
          placeholder="Author Email"
          className="w-full bg-base-300 p-3 rounded focus:ring-2 focus:ring-base-content"
        />
        <input
          {...register("title")}
          placeholder="Post Title"
          className="w-full bg-base-300 p-3 rounded focus:ring-2 focus:ring-base-content"
        />
        <textarea
          {...register("description")}
          placeholder="Post Description"
          className="w-full bg-base-300 p-3 rounded focus:ring-2 focus:ring-base-content"
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
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select tags"
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 hover:bg-gray-800 w-full text-white py-2 px-6 rounded"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
