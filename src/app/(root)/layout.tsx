"use client";

import Providers from "@/components/layouts/Providers";
import Preload from "@/components/layouts/Preload";
import { ButtonsFloat } from "@/components/fragments/ButtonsFloat";
import { useEffect, useState } from "react";

/**
 * This component is a wrapper for the entire application.
 *
 * @param {{ children: React.ReactNode }} props - The props of the component.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // LocalStorage ada atau tidak "isLogin"

    setInterval(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Preload/>;
  }

  if(!loading) return (
    <Providers>
      <div className="container">{children}</div>
      <ButtonsFloat />
    </Providers>
  );
}
