import { inferRouterOutputs } from '@trpc/server';
import { router } from '../trpc';
import { authRoutes } from './auth';
import { userRoutes } from './user';

export const appRouter = router({
  auth: authRoutes,
  user: userRoutes,
});

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>;
