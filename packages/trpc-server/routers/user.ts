import { publicProcedure, router } from "../trpc";
import { db } from "@prodx/db/src/db/db";
import * as models from "@prodx/db/src/db/schema";
import { z } from "zod";

export const userRoutes = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.coerce.string().email().min(5),
        password: z.string().min(6),
        role: z.enum(["admin", "user"]),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await db.insert(models.UserSchema).values({
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role,
      });
    }),
  all: publicProcedure.query(async (opts) => {
    return await db.select().from(models.UserSchema);
  }),
});
