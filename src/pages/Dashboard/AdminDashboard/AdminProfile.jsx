import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.put(`/admins/${encodeURIComponent(formData.email)}`,
        formData
      );

      setFormData(res.data);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been successfully updated.",
        confirmButtonColor: "#4b257d",
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
        confirmButtonColor: "#d33",
      });
    }
  };
  

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Organizer Profile</h2>

      {!isEditing ? (
        <div className="text-center space-y-4">
          <img
            src={formData.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border"
          />
          <p>
            <span className="font-semibold">Name:</span> {formData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {formData.phone || "Not provided"}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 btn btn-primary"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfile;
