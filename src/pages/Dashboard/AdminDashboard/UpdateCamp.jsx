import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCamp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camp, setCamp] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/camps/${id}`)
      .then((res) => setCamp(res.data))
      .catch((err) => console.error("Failed to load camp:", err));
  }, [id]);

  const handleUpdate = (e) => {
      e.preventDefault();
      console.log("Form submitted!");
    const form = e.target;

    const updatedCamp = {
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      description: form.description.value,
      fees: form.fees.value,
      expectedParticipants: parseInt(form.expectedParticipants.value),
      imageUrl: form.imageUrl.value,
      organizer: {
        name: form.organizerName.value,
        contact: form.organizerContact.value,
        email: form.organizerEmail.value,
      },
      location: {
        address: form.location.value,
        latitude: parseFloat(form.latitude.value),
        longitude: parseFloat(form.longitude.value),
      },
      sponsors: form.sponsors.value.split(",").map((s) => s.trim()),
      services: form.services.value.split(",").map((s) => s.trim()),
      doctors: [
        {
          name: form.doctor1Name.value,
          specialty: form.doctor1Specialty.value,
          contact: form.doctor1Contact.value,
        },
      ],
    };

    axios
      .put(`http://localhost:5000/camps/${id}`, updatedCamp)
      .then(() => {
        alert("Camp updated successfully!");
        navigate("/admin-dashboard/manage-camps");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Error updating camp.");
      });
  };

  if (!camp) return <div className="p-4">Loading camp data...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Camp</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          defaultValue={camp.title}
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="date"
          defaultValue={camp.date}
          className="input input-bordered w-full"
          required
        />
        <input
          name="time"
          defaultValue={camp.time}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          defaultValue={camp.description}
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          name="fees"
          defaultValue={camp.fees}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="expectedParticipants"
          defaultValue={camp.expectedParticipants}
          className="input input-bordered w-full"
          required
        />

        <input
          name="imageUrl"
          defaultValue={camp.imageUrl}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <h3 className="font-semibold mt-4">Organizer Info</h3>
        <input
          name="organizerName"
          defaultValue={camp.organizer?.name}
          className="input input-bordered w-full"
          required
        />
        <input
          name="organizerContact"
          defaultValue={camp.organizer?.contact}
          className="input input-bordered w-full"
          required
        />
        <input
          name="organizerEmail"
          defaultValue={camp.organizer?.email}
          className="input input-bordered w-full"
          required
        />

        <h3 className="font-semibold mt-4">Location</h3>
        <input
          name="location"
          defaultValue={camp.location?.address}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          step="any"
          name="latitude"
          defaultValue={camp.location?.latitude}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          step="any"
          name="longitude"
          defaultValue={camp.location?.longitude}
          className="input input-bordered w-full"
          required
        />

        <h3 className="font-semibold mt-4">Sponsors (comma-separated)</h3>
        <input
          name="sponsors"
          defaultValue={camp.sponsors?.join(", ")}
          className="input input-bordered w-full"
          required
        />

        <h3 className="font-semibold mt-4">Services (comma-separated)</h3>
        <input
          name="services"
          defaultValue={camp.services?.join(", ")}
          className="input input-bordered w-full"
          required
        />

        <h3 className="font-semibold mt-4">Doctors</h3>
        {camp.doctors?.[0] && (
          <>
            <input
              name="doctor1Name"
              defaultValue={camp.doctors[0].name}
              className="input input-bordered w-full"
              required
            />
            <input
              name="doctor1Specialty"
              defaultValue={camp.doctors[0].specialty}
              className="input input-bordered w-full"
              required
            />
            <input
              name="doctor1Contact"
              defaultValue={camp.doctors[0].contact}
              className="input input-bordered w-full"
              required
            />
          </>
        )}
        {camp.doctors?.[1] && (
          <>
            <input
              name="doctor2Name"
              defaultValue={camp.doctors[1].name}
              className="input input-bordered w-full"
              required
            />
            <input
              name="doctor2Specialty"
              defaultValue={camp.doctors[1].specialty}
              className="input input-bordered w-full"
              required
            />
            <input
              name="doctor2Contact"
              defaultValue={camp.doctors[1].contact}
              className="input input-bordered w-full"
              required
            />
          </>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Update Camp
        </button>
      </form>
    </div>
  );
};

export default UpdateCamp;
