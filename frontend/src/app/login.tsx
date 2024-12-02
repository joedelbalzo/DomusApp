"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "../store/authSlice";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={status === "loading"}>
          {" "}
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
