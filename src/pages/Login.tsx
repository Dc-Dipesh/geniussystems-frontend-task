import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "../assets/css/login.css";
import { LoginAction } from "../action";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "test@admin.com",
      password: "admin123",
    },
  });
  const formSubmit = (data: z.infer<typeof LoginSchema>) => {
    setIsSubmitting(true);
    LoginAction(data)
      .then((res) => {
        login(res.token);
        toast.success("Login successful");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="login-container">
        <form
          className="flex flex-col gap-4 login-form"
          onSubmit={handleSubmit(formSubmit)}
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="input"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
