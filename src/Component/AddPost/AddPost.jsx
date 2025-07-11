import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { createPost } from "../../Hoocks/Api";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";

const AddPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, control, reset } = useForm();
  const onSubmit = async (data) => {
    const tags = data.tag ? data.tag.map((t) => t.value) : [];
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
    console.log(post);

    setIsSubmitting(true);
    try {
      await createPost(post);
      Swal.fire({
        icon: "success",
        title: "Post Added!",
        text: "Your post has been created successfully.",
      });
      reset(); // Clear the form
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
  const tagOptions = [
    { value: "", label: "Select a tag" },
    { value: "Node", label: "Node" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Backend", label: "Backend" },
    { value: "React", label: "React" },
    { value: "Frontend", label: "Frontend" },
    { value: "Database", label: "Database" },
    { value: "NoSQL", label: "NoSQL" },
    { value: "Express", label: "Express" },
    { value: "API", label: "API" },
    { value: "CSS", label: "CSS" },
    { value: "Web Design", label: "Web Design" },
    { value: "Security", label: "Security" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Programming", label: "Programming" },
    { value: "Docker", label: "Docker" },
    { value: "DevOps", label: "DevOps" },
    { value: "Containers", label: "Containers" },
    { value: "GraphQL", label: "GraphQL" },
    { value: "Patterns", label: "Patterns" },
    { value: "Testing", label: "Testing" },
    { value: "Best Practices", label: "Best Practices" },
    { value: "State Management", label: "State Management" },
    { value: "Automation", label: "Automation" },
    { value: "Performance", label: "Performance" },
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 space-y-4 text-base-content"
    >
      <h2 className="text-3xl font-bold mb-4">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isSubmitting}
          className="bg-gray-700 hover:bg-gray-800 w-full text-white py-2 px-6 rounded"
        >
          {isSubmitting ? "Submitting..." : " Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
