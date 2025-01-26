"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import Map from "@/app/components/Map";
import Geocoder from "@/app/components/Geocoder";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === "error") {
      alert(result.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register("email")} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input {...register("password")} type="password" id="password" />
        </div>

        <button type="submit">Log In</button>
      </form>
      {/* <Map /> */}
      <Geocoder
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        position="top-left"
      />
    </div>
  );
}
