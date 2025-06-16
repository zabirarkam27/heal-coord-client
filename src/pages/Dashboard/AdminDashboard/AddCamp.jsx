import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const dateObj = new Date(data.dateTime);
    const date = dateObj.toISOString().split("T")[0];
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const campData = {
      title: data.campName,
      imageUrl: data.image,
      fees: data.fees,
      date,
      time,
      location: {
        address: data.location,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      },
      doctors: [
        {
          name: data.doctorName,
          specialty: data.specialty,
          contact: data.doctorContact,
        },
      ],
      participantCount: 0,
      registeredParticipants: 0,
      description: data.description,
      status: "upcoming",
      services: [],
      sponsors: [],
      organizer: {
        name: "N/A",
        contact: "N/A",
        email: "N/A",
        organizerId: "N/A",
      },
    };

    try {
      const res = await axiosSecure.post("/camps", campData);
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

        {/* Location Address */}
        <div>
          <label className="block font-medium">Location Address</label>
          <input
            type="text"
            {...register("location", {
              required: "Location address is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Latitude */}
        <div>
          <label className="block font-medium">Latitude</label>
          <input
            type="number"
            step="any"
            {...register("latitude")}
            className="input input-bordered w-full"
          />
          {errors.latitude && (
            <p className="text-red-500">{errors.latitude.message}</p>
          )}
        </div>

        {/* Longitude */}
        <div>
          <label className="block font-medium">Longitude</label>
          <input
            type="number"
            step="any"
            {...register("longitude")}
            className="input input-bordered w-full"
          />
          {errors.longitude && (
            <p className="text-red-500">{errors.longitude.message}</p>
          )}
        </div>

        {/* Doctor Name */}
        <div>
          <label className="block font-medium">Doctor Name</label>
          <input
            type="text"
            {...register("doctorName", { required: "Doctor Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.doctorName && (
            <p className="text-red-500">{errors.doctorName.message}</p>
          )}
        </div>

        {/* Doctor Specialty */}
        <div>
          <label className="block font-medium">Doctor Specialty</label>
          <input
            type="text"
            {...register("specialty")}
            className="input input-bordered w-full"
          />
          {errors.specialty && (
            <p className="text-red-500">{errors.specialty.message}</p>
          )}
        </div>

        {/* Doctor Contact */}
        <div>
          <label className="block font-medium">Doctor Contact</label>
          <input
            type="text"
            {...register("doctorContact")}
            className="input input-bordered w-full"
          />
          {errors.doctorContact && (
            <p className="text-red-500">{errors.doctorContact.message}</p>
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
