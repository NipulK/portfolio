import { z } from "zod";
export const contactSchema=z.object({name:z.string().trim().min(2).max(80),email:z.email().max(160),subject:z.string().trim().min(3).max(120),message:z.string().trim().min(10).max(3000),company:z.string().max(0).optional()});
