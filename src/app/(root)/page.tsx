'use client';

import { LoginForm } from "@/components/fragments/form/LoginForm";
import { useEffect, useState } from "react";

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
    // LocalStorage ada atau tidak "isLogin"

    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Loader...</p>;
  }
  return (
    <section>
      <LoginForm />
    </section>
  );
}
