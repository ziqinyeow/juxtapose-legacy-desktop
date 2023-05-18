import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const Media = z.object({
  // id: z.string(),
  // title: z.string(),
  // status: z.string(),
  // priority: z.string(),
  id: z.string(),
  name: z.string(),
  path: z.string(),
  size: z.number(),
  label: z.string(),
  date: z?.number(),
  format: z?.string(),
});

export type Media = z.infer<typeof Media>;
