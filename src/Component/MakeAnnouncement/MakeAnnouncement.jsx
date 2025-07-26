import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { useNavigate } from "react-router";
import { DashboardContext } from "../../Pages/Dashboard/DashBoard";
import { createAnnouncement } from "../../Hoocks/Api";

const MakeAnnouncement = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(DashboardContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      title: data.title,
      message: data.details,
      postedAt: new Date().toISOString(),
      author: {
        name: userInfo?.name || "Anonymous",
        image: userInfo?.photoURL || "https://i.pravatar.cc/100",
        role: userInfo?.role || "Admin",
      },
    };

    setIsSubmitting(true);
    try {
      await createAnnouncement(announcement);
      Swal.fire({
        icon: "success",
        title: "Announcement Posted!",
        text: "Your announcement has been successfully created.",
      });
      reset();
      navigate("/notifications");
    } catch (error) {
      console.error("Error posting announcement:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create announcement!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 space-y-4 text-base-content"
    >
      <h2 className="text-3xl font-bold mb-6">Make Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
          placeholder="Announcement Title"
          className="w-full bg-base-300 text-base-content p-3 rounded focus:ring-2 focus:ring-base-content"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <textarea
          {...register("details", {
            required: "Details are required",
            minLength: {
              value: 20,
              message: "Details must be at least 20 characters",
            },
          })}
          placeholder="Announcement Details"
          className="w-full bg-base-300 text-base-content p-3 rounded focus:ring-2 focus:ring-base-content"
          rows={5}
        ></textarea>
        {errors.details && (
          <p className="text-red-500 text-sm">{errors.details.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black hover:bg-gray-800 w-full text-white py-2 px-6 rounded transition-all ease-in-out cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
