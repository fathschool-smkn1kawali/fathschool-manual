"use client";

import { ButtonsFloat } from "@/components/fragments/ButtonsFloat";
import Providers from "@/components/layouts/Providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {/* <NavBar/> */}
      <div className="container">{children}</div>
      <ButtonsFloat />
    </Providers>
  );
}
