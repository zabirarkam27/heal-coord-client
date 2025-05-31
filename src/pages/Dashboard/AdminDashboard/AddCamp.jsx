import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const campData = {
      ...data,
      participantCount: 0, // default
    };

    try {
      const res = await axios.post("http://localhost:5000/camps", campData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Camp Added!",
          text: "The camp has been successfully added.",
          confirmButtonColor: "#4b257d",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding camp:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "There was an error adding the camp.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add A Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Camp Name */}
        <div>
          <label className="block font-medium">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.campName && (
            <p className="text-red-500">{errors.campName.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="block font-medium">Camp Fees</label>
          <input
            type="number"
            {...register("fees", { required: "Camp Fees is required" })}
            className="input input-bordered w-full"
          />
          {errors.fees && <p className="text-red-500">{errors.fees.message}</p>}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className="input input-bordered w-full"
          />
          {errors.dateTime && (
            <p className="text-red-500">{errors.dateTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label className="block font-medium">
            Healthcare Professional Name
          </label>
          <input
            type="text"
            {...register("professionalName", {
              required: "Professional name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.professionalName && (
            <p className="text-red-500">{errors.professionalName.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
