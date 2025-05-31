import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const JoinUs = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const { createNewUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, photo } = formData;

    if (password.length < 6) {
      return Swal.fire(
        "Weak Password",
        "At least 6 characters required.",
        "error"
      );
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire(
        "Missing Uppercase",
        "Include at least one uppercase letter.",
        "error"
      );
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire(
        "Missing Lowercase",
        "Include at least one lowercase letter.",
        "error"
      );
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          signOut(auth).then(() => {
            Swal.fire(
              "Success",
              "Registration successful. Please log in.",
              "success"
            );
            navigate("/login");
          });
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        Swal.fire("Success", "Signed up with Google!", "success");
        navigate("/");
      })
      .catch(() => {
        Swal.fire("Error", "Google signup failed.", "error");
      });
  };

  return (
    <>
      <Helmet>
        <title>Join Us || HealCoord</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f0fa] to-[#e6ddf3] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-black text-center mb-6 text-[#4b257d]">
            Create Account
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Join <strong>HealCoord</strong> and begin your journey to healing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input input-bordered w-full rounded-lg"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full rounded-lg"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10 rounded-lg"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="absolute top-2.5 right-3 cursor-pointer text-xl text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Paste image URL"
                className="input input-bordered w-full rounded-lg"
                value={formData.photo}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#4b257d] hover:bg-[#3a1f62] text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-gray-300 hover:border-[#4b257d] text-gray-700 hover:text-[#4b257d] font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition duration-200"
          >
            <SiGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Already have account */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4b257d] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinUs;
