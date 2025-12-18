import { createRoot } from "react-dom/client";
import "./index.css";
import { Api } from "./Routes.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Api />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
