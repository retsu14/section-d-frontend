"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center gap-[50px]">
      <div className="w-full max-w-[550px]">
        <div className="text-[50px] font-black text-blue-500">facebook</div>
        <p className="text-[28px]">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>
      <div className="flex-1 border border-gray-300 w-[396px] shadow-lg rounded-lg p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="border border-gray-300 w-full h-[50px] rounded-md px-[16px] py-[14px] placeholder:text-[16px] focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="border border-gray-300 w-full h-[50px] rounded-md px-[16px] py-[14px] placeholder:text-[16px] focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-center rounded-md h-[50px] text-white font-bold text-[20px]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">or</div>

          <Link href={"/register"}>
            <div className="bg-green-500 text-[20px] text-center font-bold rounded-md text-white h-[50px] flex items-center justify-center">
              Create new account
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
