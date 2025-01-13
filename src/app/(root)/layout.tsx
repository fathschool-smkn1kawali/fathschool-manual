"use client";

import { ButtonsFloat } from "@/components/fragments/ButtonsFloat";
import Providers from "@/components/layouts/Providers";
// import CheckGPS from "@/lib/utils/CheckGPS";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="container">{children}</div>
      <ButtonsFloat />
    </Providers>
  );
}
