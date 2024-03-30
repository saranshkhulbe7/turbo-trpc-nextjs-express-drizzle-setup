import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@prodx/trpc-server/routers";

export const trpcClient = createTRPCReact<AppRouter>();
