import { useState, useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
// import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const from = location.state?.from?.pathname || "/";

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Missing Uppercase",
        text: "Password must contain at least one uppercase letter.",
      });
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least one lowercase letter.",
      });
    }

    login(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire("Success", "Login Successful!", "success");
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire(
          "Error",
          "Login Failed! Please check your credentials.",
          "error"
        );
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        Swal.fire("Success", "Successfully Logged in with Google!", "success");
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire("Error", "Google login failed.", "error");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login || HealCoord</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f0fa] to-[#e6ddf3]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-black text-center mb-6 text-[#4b257d]">
            Welcome Back
          </h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Login to your HealCoord account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
                />
                <span
                  className="absolute top-2.5 right-3 cursor-pointer text-xl text-gray-500"
                  onClick={togglePassword}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  state={{ email }}
                  className="text-sm text-[#4b257d] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#4b257d] hover:bg-[#3a1f62] text-white font-semibold py-2.5 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 hover:border-[#4b257d] text-gray-700 hover:text-[#4b257d] font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition duration-200"
          >
            <SiGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/join-us"
              className="text-[#4b257d] font-medium hover:underline"
            >
              Join Us
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
