import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NextUIProvider>
        <div className="container">
          {children}
        </div>
        <Toaster/>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
