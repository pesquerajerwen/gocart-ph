import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  emailSent: z.boolean(),
});

export const createUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email("Invalid email address"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
