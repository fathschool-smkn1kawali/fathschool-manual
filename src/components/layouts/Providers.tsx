import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NextUIProvider>
        {children}
        <Toaster position="top-right" />
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
