"use client";

import { LoginForm } from "@/components/fragments/form/LoginForm";
import { useEffect, useState } from "react";
import { Buttons } from "@/components/fragments/Buttons";

/**
 * * A login page component.
 *
 * This component renders a login form
 * The login form is a component that accepts an email and password.
 *
 * @returns A JSX element representing the login page.
 */
export default function Login(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user");
      const isLoggedIn = !!userData;

      if (isLoggedIn) {
        window.location.href = "/dashboard/attendance";
        return;
      }

      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="min-h-[600px] flex items-center justify-center">Loading...</div>

  return (
    <section>
      <Buttons />

      <LoginForm />
    </section>
  );
}
