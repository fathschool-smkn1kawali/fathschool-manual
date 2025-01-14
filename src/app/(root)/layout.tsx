"use client";

import Providers from "@/components/layouts/Providers";
import { ButtonsFloat } from "@/components/fragments/ButtonsFloat";

/**
 * This component is a wrapper for the entire application.
 *
 * @param {{ children: React.ReactNode }} props - The props of the component.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <Providers>
      <div className="container">{children}</div>
      <ButtonsFloat />
    </Providers>
  );
}
