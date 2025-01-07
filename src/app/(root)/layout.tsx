'use client'

import Providers from "@/components/layouts/Providers";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}