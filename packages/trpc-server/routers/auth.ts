import { publicProcedure, router } from '../trpc';

export const authRoutes = router({
  users: publicProcedure.query(() => [
    {
      id: '1',
      name: 'John Doe',
    },
  ]),
});
